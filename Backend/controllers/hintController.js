import supabase from "../config/supabase.js";
import {generateHint} from "../services/aiService.js";

// Get a hint for a problem
export const getHint=async(req,res)=>{
  try{
    const{problem_id,hint_level,current_code}=req.body;

    if(!problem_id||!hint_level){
      return res.status(400).json({
        success: false,
        error: "problem_id and hint_level are required",
      });
    }

    if(hint_level<1||hint_level>3) {
      return res.status(400).json({
        success: false,
        error: "hint_level must be between 1 and 3",
      });
    }

    // Fetch the problem
    const {data: problem,error: problemError}=await supabase
      .from("problems")
      .select("problem_statement, buggy_code, hints")
      .eq("id", problem_id)
      .single();

    if(problemError||!problem){
      return res.status(404).json({
        success: false,
        error: "Problem not found",
      });
    }

    // Generate hint using AI service
    const hint=await generateHint({
      problemStatement: problem.problem_statement,
      buggyCode: problem.buggy_code,
      currentCode: current_code || problem.buggy_code,
      hintLevel: hint_level,
      hints: problem.hints,
    });

    // XP cost for hints
    const xpCosts={1: 5,2: 10,3: 20};
    const xpCost=xpCosts[hint_level]||5;

    return res.json({
      success: true,
      hint,
      hint_level,
      xp_cost:xpCost,
    });
  } catch(error) {
    console.error("Hint error:", error);
    return res.status(500).json({
      success: false,
      error: "Failed to generate hint",
    });
  }
};
