import {Request, Response, NextFunction} from "express";
import jwt from "jsonwebtoken";

export const authMiddleware = (req: Request, res: Response, next: NextFunction) => {
    
        const authHeader = req.headers.authorization;
        if (!authHeader || !authHeader.startsWith("Bearer ")) {
            return res.status(401).json({ error: " Acess denied. No token provided" });
        } 
        const token = authHeader.split(" ")[1];
        try {
            const decodedToken: any = jwt.verify(token, process.env.JWT_SECRET!);
            (req as any).userId = decodedToken._id;
            next();
        } catch (error) {
            console.error("Problem verifying token", error);
            res.status(401).json({ error: "Invalid token" });
        }
}
