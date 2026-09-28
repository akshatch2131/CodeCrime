import supabase from "../config/supabase.js";

// Get all problems
export const getProblems=async(req,res)=>{
  try{
    const {data,error}=await supabase
      .from("problems")
      .select("id,problem_number,title,difficulty,category,language,xp_reward,estimated_time,problem_statement")
      .eq("is_published",true)
      .order("problem_number",{ascending: true});

    if(error){
      console.error("Supabase error:", error);
      return res.status(500).json({
        success: false,
        error: error.message,
      });
    }

    // Check which problems the user has solved (if authenticated)
    let solvedIds=[];
    const authHeader=req.headers.authorization;
    if(authHeader&&authHeader.startsWith("Bearer ")) {
      const token=authHeader.split(" ")[1];
      const {data: userData}=await supabase.auth.getUser(token);

      if(userData?.user){
        const {data: submissions}=await supabase
          .from("submissions")
          .select("problem_id")
          .eq("user_id", userData.user.id)
          .eq("status", "passed");

        if(submissions){
          solvedIds=submissions.map((s) => s.problem_id);
        }
      }
    }

    // Attach solved status and normalize description
    const problems=(data||[]).map((p)=>({
      ...p,
      description: p.problem_statement||p.description||"",
      is_solved: solvedIds.includes(p.id),
      solved: solvedIds.includes(p.id),
    }));

    res.json({
      success: true,
      problems,
    });
  } catch(error){
    console.error("Server error:", error);
    res.status(500).json({
      success: false,
      error: "Internal server error",
    });
  }
};

// Get a single problem by ID
export const getProblemById=async(req,res)=>{
  try{
    const {id}=req.params;

    const {data,error}=await supabase
      .from("problems")
      // Select the existing row shape so deployments that have not applied the
      // optional debugging metadata migration can still open problem details.
      .select("*")
      .eq("id",id)
      .single();

    if(error?.code==="PGRST116"){
      console.error("Supabase error:",error);
      return res.status(404).json({
        success: false,
        error: "Problem not found",
      });
    }
    if(error){
      console.error("Supabase problem lookup failed:",error);
      return res.status(500).json({ success: false, error: "Unable to load problem" });
    }

    const publicProblem={ ...data };
    delete publicProblem.solution_code;
    const problem={
      ...publicProblem,
      description: data.problem_statement||data.description||"",
    };

    res.json({
      success: true,
      problem,
    });
  } catch(error){
    console.error("Server error:", error);
    res.status(500).json({
      success: false,
      error: "Internal server error",
    });
  }
};
