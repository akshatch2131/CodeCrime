import supabase from "../config/supabase.js";
import { runTestCases } from "../services/codeRunner.js";

// Submit solution and run test cases
export const submitSolution = async (req, res) => {
  try {
    const userId = req.user.id;
    const problem_id = req.body.problem_id || req.body.problemId;
    const submitted_code = req.body.submitted_code || req.body.code;
    const time_taken = req.body.time_taken || req.body.timeTaken || 0;
    const hints_used = req.body.hints_used || req.body.hintsUsed || 0;

    if (!problem_id || !submitted_code) {
      return res.status(400).json({
        success: false,
        error: "problem_id (or problemId) and submitted_code (or code) are required",
      });
    }

    // Fetch the problem with test cases
    const { data: problem, error: problemError } = await supabase
      .from("problems")
      .select("*")
      .eq("id", problem_id)
      .single();

    if (problemError || !problem) {
      return res.status(404).json({
        success: false,
        error: "Problem not found",
      });
    }

    // Run user code against test cases
    const testCases = problem.test_cases || [];
    const functionName = problem.function_name || "solution";
    const { results, passed, total } = runTestCases(submitted_code, testCases, functionName);

    // Calculate score
    const baseScore = problem.xp_reward || 100;
    const passRatio = total > 0 ? passed / total : 0;
    const rawScore = Math.round(baseScore * passRatio);

    // Time penalty: lose 1 point per 30 seconds over estimated time
    const estimatedSeconds = (problem.estimated_time || 10) * 60;
    const timePenalty = time_taken > estimatedSeconds
      ? Math.min(Math.floor((time_taken - estimatedSeconds) / 30), Math.round(rawScore * 0.3))
      : 0;

    // Hint penalty
    const hintPenalty = (hints_used || 0) * 5;

    // Bonus for no hints
    const noHintBonus = (hints_used || 0) === 0 && passRatio === 1 ? 10 : 0;

    const finalScore = Math.max(0, rawScore - timePenalty - hintPenalty + noHintBonus);
    const status = passed === total ? "passed" : "failed";

    // Save submission
    const { data: submission, error: subError } = await supabase
      .from("submissions")
      .insert([
        {
          user_id: userId,
          problem_id,
          submitted_code,
          tests_passed: passed,
          tests_total: total,
          time_taken: time_taken || 0,
          hints_used: hints_used || 0,
          score: finalScore,
          status,
        },
      ])
      .select()
      .single();

    if (subError) {
      console.error("Submission save error:", subError);
      return res.status(500).json({
        success: false,
        error: "Failed to save submission",
      });
    }

    // If all tests passed, update user profile
    if (status === "passed") {
      // Check if this is the first time solving this problem
      const { data: prevSubmissions } = await supabase
        .from("submissions")
        .select("id")
        .eq("user_id", userId)
        .eq("problem_id", problem_id)
        .eq("status", "passed")
        .neq("id", submission.id);

      const isFirstSolve = !prevSubmissions || prevSubmissions.length === 0;

      if (isFirstSolve) {
        // Fetch current profile
        const { data: profile } = await supabase
          .from("profiles")
          .select("xp, problems_solved, streak")
          .eq("id", userId)
          .single();

        if (profile) {
          const newXp = (profile.xp || 0) + finalScore;
          const newSolved = (profile.problems_solved || 0) + 1;
          const newStreak = (profile.streak || 0) + 1;

          // Determine level based on XP
          let level = "Rookie";
          if (newXp >= 5000) level = "Expert";
          else if (newXp >= 2000) level = "Debugger";
          else if (newXp >= 500) level = "Developer";
          else if (newXp >= 100) level = "Coder";

          await supabase
            .from("profiles")
            .update({
              xp: newXp,
              problems_solved: newSolved,
              streak: newStreak,
              level,
            })
            .eq("id", userId);
        }
      }
    }

    return res.json({
      success: true,
      submission: {
        ...submission,
        passed_tests: passed,
        total_tests: total,
      },
      result: {
        submission_id: submission.id,
        passed,
        total,
        score: finalScore,
        status,
        time_taken: time_taken || 0,
        hints_used: hints_used || 0,
        test_results: results,
      },
    });
  } catch (error) {
    console.error("Submit error:", error);
    return res.status(500).json({
      success: false,
      error: error.message,
    });
  }
};

// Run code without submitting (for "Run Code" button)
export const runCode = async (req, res) => {
  try {
    const problem_id = req.body.problem_id || req.body.problemId;
    const code = req.body.code || req.body.submitted_code;

    if (!problem_id || !code) {
      return res.status(400).json({
        success: false,
        error: "problem_id (or problemId) and code are required",
      });
    }

    // Fetch the problem
    const { data: problem, error: problemError } = await supabase
      .from("problems")
      .select("test_cases, function_name")
      .eq("id", problem_id)
      .single();

    if (problemError || !problem) {
      return res.status(404).json({
        success: false,
        error: "Problem not found",
      });
    }

    const testCases = problem.test_cases || [];
    const functionName = problem.function_name || "solution";
    const { results, passed, total } = runTestCases(code, testCases, functionName);

    return res.json({
      success: true,
      results,
      passed,
      total,
    });
  } catch (error) {
    console.error("Run code error:", error);
    return res.status(500).json({
      success: false,
      error: error.message,
    });
  }
};

// Get user's submissions
export const getMySubmissions = async (req, res) => {
  try {
    const userId = req.user.id;

    const { data, error } = await supabase
      .from("submissions")
      .select("*, problems(title, difficulty, category)")
      .eq("user_id", userId)
      .order("created_at", { ascending: false })
      .limit(20);

    if (error) {
      return res.status(500).json({
        success: false,
        error: error.message,
      });
    }

    const submissions = (data || []).map((s) => ({
      ...s,
      passed_tests: s.tests_passed,
      total_tests: s.tests_total,
      code: s.submitted_code,
    }));

    return res.json({
      success: true,
      submissions,
    });
  } catch (error) {
    console.error("Get submissions error:", error);
    return res.status(500).json({
      success: false,
      error: "Internal server error",
    });
  }
};

// Get submission by ID
export const getSubmissionById = async (req, res) => {
  try {
    const { id } = req.params;
    const userId = req.user.id;

    const { data, error } = await supabase
      .from("submissions")
      .select("*, problems(title, difficulty, category, xp_reward)")
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
      passed_tests: data.tests_passed,
      total_tests: data.tests_total,
      code: data.submitted_code,
    };

    return res.json({
      success: true,
      submission,
    });
  } catch (error) {
    console.error("Get submission error:", error);
    return res.status(500).json({
      success: false,
      error: "Internal server error",
    });
  }
};