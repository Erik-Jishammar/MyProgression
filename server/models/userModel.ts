import mongoose, { Schema } from "mongoose";
import { User as UserType } from "../../shared/types.js";

const userSchema = new Schema<UserType>({
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
}, { timestamps: true });

const User = mongoose.model<UserType>("User", userSchema);

export default User;