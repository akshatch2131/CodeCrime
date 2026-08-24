import supabase from "../config/supabase.js";

export const submitSolution = async (req, res) => {
  try {
    const {
      user_id,
      case_id,
      submitted_code,
      explanation
    } = req.body || {};

    // Check required data
    if (!user_id || !case_id || !submitted_code) {
      return res.status(400).json({
        success: false,
        error: "user_id, case_id and submitted_code are required"
      });
    }

    // Get test cases for this case
    const { data: tests, error: testError } = await supabase
      .from("case_test_cases")
      .select("*")
      .eq("case_id", case_id);

    if (testError) {
      console.error("Test case error:", testError);

      return res.status(500).json({
        success: false,
        error: testError.message
      });
    }

    if (!tests || tests.length === 0) {
      return res.status(404).json({
        success: false,
        error: "No test cases found for this case"
      });
    }

    // Simple checker for Case #142
    const fixed =
      submitted_code.includes("lockA.Lock()") &&
      submitted_code.includes("defer lockA.Unlock()") &&
      submitted_code.includes("lockB.Lock()") &&
      submitted_code.includes("defer lockB.Unlock()");

    // Count passed tests
    const testsTotal = tests.length;
    const testsPassed = fixed ? testsTotal : 0;

    // Calculate score
    const baseScore = Math.round(
      (testsPassed / testsTotal) * 900
    );

    const finalScore = baseScore;

    const status =
      testsPassed === testsTotal
        ? "passed"
        : "failed";

    console.log("Submission result:", {
      testsPassed,
      testsTotal,
      baseScore,
      finalScore,
      status
    });

    // Save submission
    const { error: submissionError } = await supabase
      .from("submissions")
      .insert([
        {
          user_id: user_id,
          case_id: case_id,
          submitted_code: submitted_code,
          explanation: explanation || "",
          tests_passed: testsPassed,
          tests_total: testsTotal,
          base_score: baseScore,
          final_score: finalScore,
          status: status
        }
      ]);

    if (submissionError) {
      console.error("Submission error:", submissionError);

      return res.status(500).json({
        success: false,
        error: submissionError.message
      });
    }

    // Send result back
    return res.json({
      success: true,
      result: {
        passed: testsPassed,
        total: testsTotal,
        score: finalScore,
        status: status
      }
    });

  } catch (error) {
    console.error("Server error:", error);

    return res.status(500).json({
      success: false,
      error: error.message
    });
  }
};