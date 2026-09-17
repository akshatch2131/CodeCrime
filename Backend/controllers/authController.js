import supabase from "../config/supabase.js";

// Register a new user
export const register = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
      return res.status(400).json({
        success: false,
        error: "Name, email and password are required",
      });
    }

    if (password.length < 6) {
      return res.status(400).json({
        success: false,
        error: "Password must be at least 6 characters",
      });
    }

    // Create user with Supabase Auth
    const { data: authData, error: authError } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: { name },
      },
    });

    if (authError) {
      return res.status(400).json({
        success: false,
        error: authError.message,
      });
    }

    // Create profile in profiles table
    const { error: profileError } = await supabase.from("profiles").insert([
      {
        id: authData.user.id,
        name,
        email,
        xp: 0,
        problems_solved: 0,
        streak: 0,
        level: "Rookie",
      },
    ]);

    if (profileError) {
      console.error("Profile creation error:", profileError);
      // Don't fail the registration if profile creation fails
      // It can be created later
    }

    return res.status(201).json({
      success: true,
      user: {
        id: authData.user.id,
        email: authData.user.email,
        name,
      },
      session: authData.session,
    });
  } catch (error) {
    console.error("Register error:", error);
    return res.status(500).json({
      success: false,
      error: "Internal server error",
    });
  }
};

// Login user
export const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({
        success: false,
        error: "Email and password are required",
      });
    }

    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      return res.status(401).json({
        success: false,
        error: error.message,
      });
    }

    return res.json({
      success: true,
      user: {
        id: data.user.id,
        email: data.user.email,
        name: data.user.user_metadata?.name || "",
      },
      session: data.session,
    });
  } catch (error) {
    console.error("Login error:", error);
    return res.status(500).json({
      success: false,
      error: "Internal server error",
    });
  }
};

// Get current user profile
export const getMe = async (req, res) => {
  try {
    const userId = req.user.id;

    // Fetch profile from profiles table
    const { data: profile, error } = await supabase
      .from("profiles")
      .select("*")
      .eq("id", userId)
      .single();

    if (error || !profile) {
      // Return basic info from auth if profile doesn't exist
      return res.json({
        success: true,
        user: {
          id: req.user.id,
          email: req.user.email,
          name: req.user.user_metadata?.name || "",
          xp: 0,
          problems_solved: 0,
          streak: 0,
          level: "Rookie",
        },
      });
    }

    return res.json({
      success: true,
      user: profile,
    });
  } catch (error) {
    console.error("GetMe error:", error);
    return res.status(500).json({
      success: false,
      error: "Internal server error",
    });
  }
};
