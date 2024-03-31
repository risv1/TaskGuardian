import { Request, Response, NextFunction } from "express";

export const IsAuthenticated = (req: Request, res: Response, next: NextFunction) => {
    try{

        const token = req.cookies.token;
        if (!token) {
            return res.status(401).json({ message: "Unauthorized" });
        }

        next();

    } catch (err) {
        res.status(500).json({ message: "Internal server error", error: err });
    }
}