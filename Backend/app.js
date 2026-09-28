import express from "express";
import cors from "cors";
import authRoutes from "./routes/authRoutes.js";
import problemRoutes from "./routes/problemRoutes.js";
import submissionRoutes from "./routes/submissionRoutes.js";
import hintRoutes from "./routes/hintRoutes.js";
import leaderboardRoutes from "./routes/leaderboardRoutes.js";

const app = express();

app.use(cors());

app.use(express.json({ limit: "1mb" }));

// Health check
app.get("/",(req,res)=>{
  res.json({
    message: "CodeCrime Backend is Running",
    version: "2.0.0",
  });
});

// API Routes
app.use("/api/auth",authRoutes);
app.use("/api/problems",problemRoutes);
app.use("/api/submissions",submissionRoutes);
app.use("/api/hints",hintRoutes);
app.use("/api/leaderboard",leaderboardRoutes);

// 404 handler
app.use((req,res)=>{
  res.status(404).json({
    success: false,
    error: "Route not found",
  });
});

// Error handler
app.use((err,req,res,next)=>{
  console.error("Server error:", err);
  res.status(500).json({
    success: false,
    error: "Internal server error",
  });
});

export default app;