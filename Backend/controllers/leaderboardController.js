import supabase from "../config/supabase.js";

// Get leaderboard
export const getLeaderboard = async (req, res) => {
  try {
    const { data, error } = await supabase
      .from("profiles")
      .select("id, name, xp, problems_solved, level")
      .order("xp", { ascending: false })
      .limit(50);

    if (error) {
      return res.status(500).json({
        success: false,
        error: error.message,
      });
    }

    // Add rank
    const leaderboard = (data || []).map((user, index) => ({
      rank: index + 1,
      ...user,
    }));

    return res.json({
      success: true,
      leaderboard,
    });
  } catch (error) {
    console.error("Leaderboard error:", error);
    return res.status(500).json({
      success: false,
      error: "Internal server error",
    });
  }
};
