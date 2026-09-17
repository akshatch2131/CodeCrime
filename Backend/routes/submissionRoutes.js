import express from "express";
import {
  submitSolution,
  runCode,
  getMySubmissions,
  getSubmissionById,
} from "../controllers/submissionController.js";
import authMiddleware from "../middleware/auth.js";

const router = express.Router();

router.post("/", authMiddleware, submitSolution);
router.post("/run", authMiddleware, runCode);
router.get("/my", authMiddleware, getMySubmissions);
router.get("/:id", authMiddleware, getSubmissionById);

export default router;