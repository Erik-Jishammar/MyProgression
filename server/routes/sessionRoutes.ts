import express from "express";
import {
  getSessions,
  createSession,
  updateSession,
  deleteSession,
} from "../controllers/sessionController.js";
import { authMiddleware } from "../middleware/authMiddleware.js";

const router = express.Router();

router.get("/exercises", authMiddleware, getSessions);
router.post("/exercises", authMiddleware, createSession);
router.put("/exercises/:id", authMiddleware, updateSession);
router.delete("/exercises/:id", authMiddleware, deleteSession);

router.get("/ping", (_req, res) => {
  res.json({ message: "Server is running" });
});

export default router;
