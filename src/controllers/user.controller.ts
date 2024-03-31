import { Request, Response } from "express"
import { Task } from "../models/task"

export const HelloWorld = (req: Request, res: Response) => {
    res.status(200).json({ message: "Hello World" })
}
