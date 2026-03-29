import mongoose, { Schema } from "mongoose";
import { Session as SessionType, Exercise as ExerciseType } from "../../shared/types.js";

const exerciseSchema = new Schema<ExerciseType>({
    name: { type: String, required: true },
    sets: { type: Number, required: true },
    reps: { type: Number, required: true },
    weight: { type: Number, required: true },
    comment: { type: String },
}, { timestamps: true });

const sessionSchema = new Schema<SessionType>({
    userId: { type: String, required: true },
    split: { type: String, required: true },
    date: { type: String, required: true },
    exercises: { type: [exerciseSchema], required: true },
}, { timestamps: true });

const Session = mongoose.model<SessionType>("Session", sessionSchema);

export default Session;
