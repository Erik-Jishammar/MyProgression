import { Request, Response } from "express";
import { getCollection } from "../models/sessionModel.js";
import type { Session } from "../../shared/types.js";

export const getSessions = async (req: Request, res: Response) => {
  try {
    const userId = (req as any).userId;
    const collection = getCollection();
    const sessions = await collection.find({ userId }).toArray(); // implement user id to only fetch user's sessions
    res.json(sessions);
  } catch (error) {
    console.error("Problem fetching from database", error);
    res.status(500).json({ error: "Could not fetch sessions" });
  }
};

export const createSession = async (
  req: Request<{}, {}, Session>,
  res: Response
) => {
  try {
    const collection = getCollection();
    const newSession: Session = req.body;

    if (!newSession._id) newSession._id = Date.now().toString();
    newSession.exercises = newSession.exercises || [];
    newSession.userId = (req as any).userId; // attach user id

    await collection.insertOne(newSession);
    res.json(newSession);
  } catch (error) {
    console.error("Problem saving to database", error);
    res.status(500).json({ error: "Could not save session" });
  }
};

export const updateSession = async (
  req: Request<{ id: string }, {}, Partial<Session>>,
  res: Response
) => {
  try {
    const collection = getCollection();
    const { id } = req.params;
    const updateData = req.body;
    const userId = (req as any).userId;

    await collection.updateOne({ _id: id, userId }, { $set: updateData });

    res.json({ message: "Session updated" });
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
    const collection = getCollection();
    const { id } = req.params;
    const userId = (req as any).userId;

    await collection.deleteOne({ _id: id, userId });

    res.json({ message: "Session deleted" });
  } catch (error) {
    console.error("Problem deleting session", error);
    res.status(500).json({ error: "Could not delete session" });
  }
};
