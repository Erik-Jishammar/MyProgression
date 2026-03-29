import { Request, Response } from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { validateAuth } from "../../shared/validators.js";
import User from "../models/userModel.js";

// user registration
export const signup = async (req: Request, res: Response) => { 
    try {
        const {email, password} = req.body;

        // validate input
        const errors = validateAuth(req.body);
        if (errors.length > 0) {
            return res.status(400).json({ errors });
        }
        // check if user already exists
        const user = await User.findOne({email});
        if (user) {
            return res.status(400).json({ error: "User already exists" });
        }
        // hash password for safety
        const hashedPassword = await bcrypt.hash(password, 10);
        // create new user and save to db
        const newUser = await User.create({
            email,
            password: hashedPassword,
        });

        // generate a JWT token for the user
        const token = jwt.sign(
            {_id: newUser._id}, 
            process.env.JWT_SECRET!,
            {expiresIn: "1h"});
        // send res with token and user info
        res.status(201).json({
            message: 'User created',
            token, 
            user: {
                _id: newUser._id.toString(),
                email: newUser.email,
            },
        });
        
    } catch (error) {
        console.error("Problem creating user", error);
        res.status(500).json({ error: "Could not create user" });
    }
} 
// handle user login
export const login = async (req: Request, res: Response) => {
    try {
        const {email, password} = req.body;
        // validate input
        const errors = validateAuth(req.body);
        if (errors.length > 0) {
            return res.status(400).json({ errors });
        }
        // find user in db
        const user: any = await User.findOne({email});
        if (!user) {
            return res.status(401).json({ error: "Invalid credentials" });
        }
        // compare provided pwd with hashed pwd in db
        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
            return res.status(401).json({ error: "Invalid credentials" });
        }
        // generate a new JWT token for the user
        const token = jwt.sign(
            {_id: user._id}, 
            process.env.JWT_SECRET!,
            {expiresIn: "1h"});
        // send sucessful res with token and user info
        res.status(200).json({
            message: "Login successful",
            token,
            user: {
                _id: user._id.toString(),
                email: user.email,
            },
        });
    } catch (error) {
        console.error("Problem logging in", error);
        res.status(500).json({ error: "Could not log in" });
    }
}

