import { Request, Response } from "express";
import { db } from "../database/db";
import { tasks } from "../database/schema";
import { eq } from "drizzle-orm";

export const AssignTask = async (req: Request, res: Response) => {
    try {
        const { assignee } = req.body
        const id = req.params.id

        const taskData = await db.update(tasks).set({ assignee }).where(eq(tasks.id, id))
        if (!taskData) {
            return res.status(500).json({ message: "Couldn't assign task" })
        }

        res.status(200).json({ message: "Task updated" })
    } catch (err) {
        res.status(500).json({ message: "Internal server error", error: err })
    }
}

