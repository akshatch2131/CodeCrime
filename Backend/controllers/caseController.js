import supabase from "../config/supabase.js";

export const getCases = async (req, res) => {
  try {
    const { data, error } = await supabase
      .from("cases")
      .select("*")
      .eq("is_published", true)
      .order("case_number", { ascending: true });

    if (error) {
      console.error("Supabase error:", error);

      return res.status(500).json({
        success: false,
        error: error.message,
      });
    }

    res.json({
      success: true,
      cases: data,
    });
  } catch (error) {
    console.error("Server error:", error);

    res.status(500).json({
      success: false,
      error: "Internal server error",
    });
  }
};


// Get one case by ID
export const getCaseById = async (req, res) => {
  try {
    const { id } = req.params;

    const { data, error } = await supabase
      .from("cases")
      .select("*")
      .eq("id", id)
      .single();

    if (error) {
      console.error("Supabase error:", error);

      return res.status(404).json({
        success: false,
        error: error.message,
      });
    }

    res.json({
      success: true,
      case: data,
    });
  } catch (error) {
    console.error("Server error:", error);

    res.status(500).json({
      success: false,
      error: "Internal server error",
    });
  }
};