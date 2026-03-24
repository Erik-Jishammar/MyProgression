import express from "express";
import {
  getSessions,
  createSession,
  updateSession,
  deleteSession,
} from "../controllers/sessionController.js";
import { authMiddleware } from "../middleware/authMiddleware.js";

const router = express.Router();

router.get("/", authMiddleware, getSessions);
router.post("/", authMiddleware, createSession);
router.put("/:id", authMiddleware, updateSession);
router.delete("/:id", authMiddleware, deleteSession);

router.get("/ping", (_req, res) => {
  res.json({ message: "Server is running" });
});

export default router;
