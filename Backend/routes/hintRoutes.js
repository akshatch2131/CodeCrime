import express from "express";
import { getHint } from "../controllers/hintController.js";
import authMiddleware from "../middleware/auth.js";

const router = express.Router();

router.post("/", authMiddleware, getHint);

export default router;
