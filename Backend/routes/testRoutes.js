import express from "express";
import supabase from "../config/supabase.js";

const router = express.Router();

router.get("/cases", async (req, res) => {
  try {
    const { data, error } = await supabase
      .from("cases")
      .select("*");

    console.log("SUPABASE DATA:", data);
    console.log("SUPABASE ERROR:", error);

    if (error) {
      return res.status(500).json({
        success: false,
        error: error.message
      });
    }

    res.json({
      success: true,
      cases: data
    });

  } catch (error) {
    console.error("SERVER ERROR:", error);

    res.status(500).json({
      success: false,
      error: error.message
    });
  }
});

export default router;