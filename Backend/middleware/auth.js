import supabase from "../config/supabase.js";

/**
 * Middleware to verify Supabase auth token.
 * Extracts user from the Authorization header Bearer token.
 */
const authMiddleware = async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return res.status(401).json({
        success: false,
        error: "No authentication token provided",
      });
    }

    const token = authHeader.split(" ")[1];

    // Verify token with Supabase
    const { data, error } = await supabase.auth.getUser(token);

    if (error || !data.user) {
      return res.status(401).json({
        success: false,
        error: "Invalid or expired token",
      });
    }

    // Attach user to request
    req.user = data.user;
    next();
  } catch (error) {
    console.error("Auth middleware error:", error);
    return res.status(500).json({
      success: false,
      error: "Authentication failed",
    });
  }
};

export default authMiddleware;
