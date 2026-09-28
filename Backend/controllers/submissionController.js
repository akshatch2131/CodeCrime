import { createClient } from "@supabase/supabase-js";
import supabase from "../config/supabase.js";
import { runTestCases } from "../services/codeRunner.js";

const supabaseAdminKey=
  process.env.SUPABASE_SERVICE_ROLE_KEY||process.env.SUPABASE_PUBLISHABLE_KEY;
const supabaseAdmin=createClient(process.env.SUPABASE_URL,supabaseAdminKey, {
  auth:{
    autoRefreshToken: false,
    persistSession: false,
  },
});


export const submitSolution=async(req,res)=>{
  try{
    console.log("\n========================================");
    console.log("SUBMISSION STARTED");
    console.log("========================================");

    // 1. AUTHENTICATED USER
    const userId=req.user?.id;

    if(!userId){
      return res.status(401).json({
        success: false,
        error: "User is not authenticated",
      });
    }

    const problem_id =
      req.body.problem_id||
      req.body.problemId;

    const submitted_code=
      req.body.submitted_code||
      req.body.code;

    const time_taken=
      Number(
        req.body.time_taken||
        req.body.timeTaken||
        0
      );

    const hints_used=
      Number(
        req.body.hints_used||
        req.body.hintsUsed||
        0
      );

    console.log("User ID:",userId);
    console.log("Problem ID:",problem_id);
    console.log("Time Taken:",time_taken);
    console.log("Hints Used:",hints_used);

    // 2. VALIDATION
    if(!problem_id||!submitted_code){
      return res.status(400).json({
        success: false,
        error:
          "problem_id (or problemId) and submitted_code (or code) are required",
      });
    }

    // 3. FETCH PROBLEM
    const {data:problem,error:problemError}=
      await supabaseAdmin
        .from("problems")
        .select("*")
        .eq("id", problem_id)
        .single();

    if(problemError){
      console.error("Problem fetch error:", problemError);

      return res.status(404).json({
        success: false,
        error: "Problem not found",
        details: problemError.message,
      });
    }

    if(!problem){
      return res.status(404).json({
        success: false,
        error: "Problem not found",
      });
    }

    console.log("Problem found:", problem.title);

    
    // 4. GET TEST CASES
    const testCases=Array.isArray(problem.test_cases)
      ? problem.test_cases
      : [];

    const functionName=
      problem.function_name||"solution";

    console.log("Function name:", functionName);
    console.log("Total test cases:", testCases.length);

    // 5. RUN USER CODE
    const{
      results,
      passed,
      total,
    }=runTestCases(
      submitted_code,
      testCases,
      functionName
    );

    console.log("Tests passed:", passed);
    console.log("Tests total:", total);

    
    // 6. SCORE CALCULATION
    const baseScore=
      Number(problem.xp_reward)||100;

    const passRatio=
      total>0
        ?passed/total
        :0;

    const rawScore=
      Math.round(baseScore*passRatio);

    

    let estimatedMinutes=10;

    if (problem.estimated_time!==null&&
      problem.estimated_time!==undefined) {

      const match=String(
        problem.estimated_time
      ).match(/\d+/);

      if (match){
        estimatedMinutes = Number(match[0]);
      }
    }

    const estimatedSeconds =
      estimatedMinutes * 60;

      // TIME PENALTY
    const timePenalty=
      time_taken>estimatedSeconds
        ? Math.min(
          Math.floor(
            (time_taken-estimatedSeconds)/30
          ),
          Math.round(rawScore*0.3)
        )
        :0;

    
    // HINT PENALTY
    const hintPenalty=
      hints_used*5;

    
    // NO-HINT BONUS
    const noHintBonus =
      hints_used===0&&passRatio===1
        ?10
        :0;

    const finalScore=
      Math.max(
        0,
        rawScore-
        timePenalty-
        hintPenalty+
        noHintBonus
      );

    
    // STATUS
    const status=
      passed===total&&total>0
        ?"passed"
        :"failed";

    console.log("\n========================================");
    console.log("SCORE CALCULATION");
    console.log("========================================");
    console.log("Base score:", baseScore);
    console.log("Pass ratio:", passRatio);
    console.log("Raw score:", rawScore);
    console.log("Time penalty:", timePenalty);
    console.log("Hint penalty:", hintPenalty);
    console.log("No hint bonus:", noHintBonus);
    console.log("Final score:", finalScore);
    console.log("Status:", status);
    console.log("========================================");

    // 7. SAVE SUBMISSION
    const{
      data: submission,
      error: subError,
    } = await supabaseAdmin
      .from("submissions")
      .insert([
        {
          user_id: userId,
          problem_id: problem_id,
          submitted_code: submitted_code,

          tests_passed: passed,
          tests_total: total,

          time_taken: time_taken,
          hints_used: hints_used,

          score: finalScore,
          status: status,
        },
      ])
      .select()
      .single();

    if(subError){
      console.error(
        "Submission save error:",
        subError
      );

      return res.status(500).json({
        success: false,
        error: subError.message,
        details: subError.details,
        hint: subError.hint,
        code: subError.code,
      });
    }

    console.log(
      "Submission saved successfully:",
      submission.id
    );

    
    // 8. ONLY AWARD XP IF ALL TESTS PASSED
    let xpAwarded=0;
    let profile=null;
    let isFirstSolve=false;

    if(status==="passed"){

      console.log("\n========================================");
      console.log("SUCCESSFUL SOLUTION");
      console.log("Checking first solve...");
      console.log("========================================");

      // --------------------------------------------------------
      // Check whether this user already solved this problem
      // successfully BEFORE this submission.
      //
      // IMPORTANT:
      // We DO NOT delete previous submissions.
      // We simply check them.
      // --------------------------------------------------------

      const {
        data: previousSuccessfulSubmissions,
        error: previousSubmissionError,
      } = await supabaseAdmin
        .from("submissions")
        .select("id")
        .eq("user_id", userId)
        .eq("problem_id", problem_id)
        .eq("status", "passed")
        .neq("id", submission.id);

      if (previousSubmissionError) {
        console.error(
          "Previous submission check error:",
          previousSubmissionError
        );

        return res.status(500).json({
          success: false,
          error:
            "Submission saved, but previous submission check failed",
          details:
            previousSubmissionError.message,
        });
      }

      const previousCount =
        previousSuccessfulSubmissions?.length || 0;

      isFirstSolve =
        previousCount === 0;

      console.log(
        "Previous successful submissions:",
        previousCount
      );

      console.log(
        "Is first solve:",
        isFirstSolve
      );

      // --------------------------------------------------------
      // 9. AWARD XP ONLY FOR FIRST SOLVE
      // --------------------------------------------------------

      if (isFirstSolve) {

        console.log("\n========================================");
        console.log("AWARDING XP");
        console.log("========================================");
        console.log("User ID:", userId);
        console.log("XP to award:", finalScore);

        // ------------------------------------------------------
        // FETCH PROFILE USING ADMIN CLIENT
        // This bypasses profiles RLS.
        // ------------------------------------------------------

        const {
          data: currentProfile,
          error: profileFetchError,
        } = await supabaseAdmin
          .from("profiles")
          .select(
            "id, xp, cases_solved, current_streak, longest_streak, rank"
          )
          .eq("id", userId)
          .maybeSingle();

        if (profileFetchError) {

          console.error(
            "PROFILE FETCH ERROR:",
            profileFetchError
          );

          return res.status(500).json({
            success: false,
            error:
              "Submission saved, but profile could not be fetched",
            details:
              profileFetchError.message,
          });
        }

        // ------------------------------------------------------
        // If profile does not exist, create it.
        // ------------------------------------------------------

        if (!currentProfile) {

          console.log(
            "Profile does not exist. Creating profile..."
          );

          const newProfile = {
            id: userId,
            xp: finalScore,
            cases_solved: 1,
            current_streak: 1,
            longest_streak: 1,
            rank:
              finalScore >= 500
                ? "Developer"
                : finalScore >= 100
                  ? "Coder"
                  : "Rookie",
            updated_at:
              new Date().toISOString(),
          };

          const {
            data: createdProfile,
            error: createProfileError,
          } = await supabase
            .from("profiles")
            .select("xp, cases_solved, current_streak, longest_streak, rank")
            .eq("id", userId)
            .maybeSingle();

          if (createProfileError) {

            console.error(
              "Profile creation error:",
              createProfileError
            );

            return res.status(500).json({
              success: false,
              error:
                "Submission saved, but profile could not be created",
              details:
                createProfileError.message,
            });
          }

          profile = createdProfile;
          xpAwarded = finalScore;

          console.log(
            `New profile created with ${finalScore} XP`
          );

        } else {

          // ----------------------------------------------------
          // PROFILE EXISTS
          // ----------------------------------------------------

          const oldXp =
            Number(currentProfile.xp) || 0;

          const oldCasesSolved =
            Number(currentProfile.cases_solved) || 0;

          const oldCurrentStreak =
            Number(currentProfile.current_streak) || 0;

          const oldLongestStreak =
            Number(currentProfile.longest_streak) || 0;

          // ----------------------------------------------------
          // CALCULATE NEW VALUES
          // ----------------------------------------------------

          const newXp =
            oldXp + finalScore;

          const newCasesSolved =
            oldCasesSolved + 1;

          const newCurrentStreak =
            oldCurrentStreak + 1;

          const newLongestStreak =
            Math.max(
              oldLongestStreak,
              newCurrentStreak
            );

          // ----------------------------------------------------
          // DETERMINE RANK
          // ----------------------------------------------------

          let newRank = "Rookie";

          if (newXp >= 5000) {
            newRank = "Expert";
          } else if (newXp >= 2000) {
            newRank = "Debugger";
          } else if (newXp >= 500) {
            newRank = "Developer";
          } else if (newXp >= 100) {
            newRank = "Coder";
          }

          console.log(
            "Current XP:",
            oldXp
          );

          console.log(
            "XP earned:",
            finalScore
          );

          console.log(
            "New XP:",
            newXp
          );

          console.log(
            "Cases solved:",
            newCasesSolved
          );

          console.log(
            "New rank:",
            newRank
          );

          // ----------------------------------------------------
          // UPDATE PROFILE
          //
          // THIS IS THE IMPORTANT PART:
          // Use supabaseAdmin instead of the normal anon client.
          // ----------------------------------------------------

          const { data: updatedProfile, error: profileUpdateError } = await supabase
            .from("profiles")
            .update({
              xp: newXp,
              cases_solved: newCasesSolved,
              current_streak: newCurrentStreak,
              longest_streak: newLongestStreak,
              rank: newRank,
              updated_at: new Date().toISOString(),
            })
            .eq("id", userId)
            .select()
            .maybeSingle();
          if (profileUpdateError) {

            console.error(
              "PROFILE UPDATE ERROR:",
              profileUpdateError
            );

            return res.status(500).json({
              success: false,
              error:
                "Submission saved, but XP could not be updated",
              details:
                profileUpdateError.message,
              xp_attempted: finalScore,
            });
          }

          profile = updatedProfile;
          xpAwarded = finalScore;

          console.log(
            `XP updated successfully: ${userId} +${finalScore} XP`
          );

          console.log(
            "Updated profile:",
            updatedProfile
          );
        }

        console.log("========================================");

      } else {

        console.log(
          "Problem already solved previously."
        );

        console.log(
          "No additional XP awarded."
        );

        xpAwarded = 0;
      }
    }

    // ==========================================================
    // 10. FINAL RESPONSE
    // ==========================================================

    return res.json({
      success: true,

      submission: {
        ...submission,

        passed_tests: passed,
        total_tests: total,

        code: submitted_code,
      },

      result: {
        submission_id: submission.id,

        passed,
        total,

        score: finalScore,

        status,

        time_taken,
        hints_used,

        test_results: results,

        // XP information
        xp_awarded: xpAwarded,
        is_first_solve: isFirstSolve,

        profile: profile
          ? {
            xp: profile.xp,
            cases_solved:
              profile.cases_solved,
            current_streak:
              profile.current_streak,
            longest_streak:
              profile.longest_streak,
            rank: profile.rank,
          }
          : null,
      },
    });

  } catch (error) {

    console.error(
      "Submit error:",
      error
    );

    return res.status(500).json({
      success: false,
      error: error.message,
    });
  }
};


// ============================================================
// RUN CODE
// ============================================================

export const runCode = async (req, res) => {
  try {

    const problem_id =
      req.body.problem_id ||
      req.body.problemId;

    const code =
      req.body.code ||
      req.body.submitted_code;

    if (!problem_id || !code) {
      return res.status(400).json({
        success: false,
        error:
          "problem_id (or problemId) and code are required",
      });
    }

    // ----------------------------------------------------------
    // Fetch problem
    // ----------------------------------------------------------

    const {
      data: problem,
      error: problemError,
    } = await supabaseAdmin
      .from("problems")
      .select(
        "id, test_cases, function_name"
      )
      .eq("id", problem_id)
      .single();

    if (
      problemError?.code === "PGRST116" ||
      (!problemError && !problem)
    ) {
      return res.status(404).json({
        success: false,
        error: "Problem not found",
      });
    }

    if (problemError) {
      console.error(
        "Run code problem lookup failed:",
        problemError
      );

      return res.status(500).json({
        success: false,
        error:
          "Unable to load problem test cases",
      });
    }

    // ----------------------------------------------------------
    // Test cases
    // ----------------------------------------------------------

    const testCases =
      Array.isArray(problem.test_cases)
        ? problem.test_cases
        : [];

    const functionName =
      problem.function_name ||
      "solution";

    const {
      results,
      passed,
      total,
    } = runTestCases(
      code,
      testCases,
      functionName
    );

    return res.json({
      success: true,

      problem_id: problem.id,

      results,

      passed,
      total,
    });

  } catch (error) {

    console.error(
      "Run code error:",
      error
    );

    return res.status(500).json({
      success: false,
      error: error.message,
    });
  }
};


// ============================================================
// GET MY SUBMISSIONS
// ============================================================

export const getMySubmissions = async (
  req,
  res
) => {

  try {

    const userId = req.user?.id;

    if (!userId) {
      return res.status(401).json({
        success: false,
        error: "User is not authenticated",
      });
    }

    const {
      data,
      error,
    } = await supabaseAdmin
      .from("submissions")
      .select(
        "*, problems(title, difficulty, category)"
      )
      .eq("user_id", userId)
      .order(
        "created_at",
        { ascending: false }
      )
      .limit(20);

    if (error) {

      console.error(
        "Get submissions error:",
        error
      );

      return res.status(500).json({
        success: false,
        error: error.message,
      });
    }

    const submissions =
      (data || []).map((s) => ({
        ...s,

        passed_tests:
          s.tests_passed,

        total_tests:
          s.tests_total,

        code:
          s.submitted_code,
      }));

    return res.json({
      success: true,
      submissions,
    });

  } catch (error) {

    console.error(
      "Get submissions error:",
      error
    );

    return res.status(500).json({
      success: false,
      error: "Internal server error",
    });
  }
};


// ============================================================
// GET SUBMISSION BY ID
// ============================================================

export const getSubmissionById = async (
  req,
  res
) => {

  try {

    const { id } =
      req.params;

    const userId =
      req.user?.id;

    if (!userId) {
      return res.status(401).json({
        success: false,
        error: "User is not authenticated",
      });
    }

    const {
      data,
      error,
    } = await supabaseAdmin
      .from("submissions")
      .select(
        "*, problems(title, difficulty, category, xp_reward)"
      )
      .eq("id", id)
      .eq("user_id", userId)
      .single();

    if (error || !data) {

      return res.status(404).json({
        success: false,
        error: "Submission not found",
      });
    }

    const submission = {
      ...data,

      passed_tests:
        data.tests_passed,

      total_tests:
        data.tests_total,

      code:
        data.submitted_code,
    };

    return res.json({
      success: true,
      submission,
    });

  } catch (error) {

    console.error(
      "Get submission error:",
      error
    );

    return res.status(500).json({
      success: false,
      error: "Internal server error",
    });
  }
};
