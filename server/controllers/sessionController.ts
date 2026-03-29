import { Request, Response } from "express";
import Session from "../models/sessionModel.js";
import type { Session as SessionType } from "../../shared/types.js";

export const getSessions = async (req: Request, res: Response) => {
  try {
    const userId = (req as any).userId;
    const sessions = await Session.find({ userId });
    res.json(sessions);
  } catch (error) {
    console.error("Problem fetching from database", error);
    res.status(500).json({ error: "Could not fetch sessions" });
  }
};

export const createSession = async (
  req: Request<{}, {}, SessionType>,
  res: Response
) => {
  try {
    const sessionData = req.body;
    const userId = (req as any).userId;

    // Strip out _id from session and exercises to let mongoose generate correct ObjectIds
    // To fix error -> frontend sends timestamp-based strings
    const { _id, ...restOfSession } = sessionData as any;
    
    if (restOfSession.exercises) {
      restOfSession.exercises = restOfSession.exercises.map((ex: any) => {
        const { _id, ...restOfEx } = ex; // Remove frontend-generated _id
        return restOfEx;
      });
    }

    const newSession = await Session.create({
      ...restOfSession,
      userId,
    });

    res.status(201).json(newSession);
  } catch (error) {
    console.error("Problem saving to database", error);
    res.status(500).json({ error: "Could not save session" });
  }
};

export const updateSession = async (
  req: Request<{ id: string }, {}, Partial<SessionType>>,
  res: Response
) => {
  try {
    const { id } = req.params;
    const updateData = req.body;
    const userId = (req as any).userId;

    // For upd, make sure we dont try to "update" the _id field
    const { _id, ...cleanUpdateData } = updateData as any;

    const updatedSession = await Session.findOneAndUpdate(
      { _id: id, userId },
      { $set: cleanUpdateData },
      { new: true }
    );

    if (!updatedSession) {
      return res.status(404).json({ error: "Session not found or unauthorized" });
    }

    res.json(updatedSession);
  } catch (error) {
    console.error("Problem updating session", error);
    res.status(500).json({ error: "Could not update session" });
  }
};

export const deleteSession = async (
  req: Request<{ id: string }>,
  res: Response
) => {
  try {
    const { id } = req.params;
    const userId = (req as any).userId;

    const result = await Session.deleteOne({ _id: id, userId });

    if (result.deletedCount === 0) {
      return res.status(404).json({ error: "Session not found or unauthorized" });
    }

    res.json({ message: "Session deleted" });
  } catch (error) {
    console.error("Problem deleting session", error);
    res.status(500).json({ error: "Could not delete session" });
  }
};
