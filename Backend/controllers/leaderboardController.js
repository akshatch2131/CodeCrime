import supabase from "../config/supabase.js";

// Get leaderboard
export const getLeaderboard=async(req,res)=>{
  try{
    const {data,error}=await supabase
      .from("profiles")
      .select("id,username,full_name,xp,rank,cases_solved")
      .order("xp",{ascending: false})
      .limit(50);

    if(error){
      return res.status(500).json({
        success: false,
        error: error.message,
      });
    }

    // Add rank
    const leaderboard=(data||[]).map((profile,index)=>({
      id: profile.id,
      username: profile.username||profile.full_name||null,
      xp: profile.xp ?? 0,
      rank: index+1,
      level: profile.rank||null,
      cases_solved: profile.cases_solved??0,
    }));

    return res.json({
      success: true,
      leaderboard,
    });
  } catch(error){
    console.error("Leaderboard error:", error);
    return res.status(500).json({
      success: false,
      error: "Internal server error",
    });
  }
};
