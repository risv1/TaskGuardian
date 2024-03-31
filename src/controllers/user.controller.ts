import { Request, Response } from "express"
import { v4 as uuid } from "uuid"
import { Task } from "../models/task"
import jwt from "jsonwebtoken"
import { tasks } from "../database/schema"
import { db } from "../database/db"
import { eq } from "drizzle-orm"

export const CheckRole = (req: Request, res: Response) => {
    const token = req.cookies.token
    if (!token) {
        throw new Error("Unauthorized")
    }

    const user = jwt.verify(token, process.env.JWT_SECRET!)
    if (!user) {
        throw new Error("Unauthorized")
    }

    return user
}

export const CreateTask = async (req: Request, res: Response) => {
    try {
        const { name, description } = req.body

        const createdAt = new Date().toISOString()
        const updatedAt = new Date().toISOString()
        const id = uuid()

        const task: Task = {
            id: id,
            name,
            description,
            status: "pending",
            createdAt,
            updatedAt,
            assignee: ""
        }

        const user = CheckRole(req, res)
        if (typeof user === 'object' && 'role' in user && user.role === 'user') {
            task.assignee = user.email
        }else{
            task.assignee = req.body.assignee
        }

        const taskData = await db.insert(tasks).values(task)
        if (!taskData) {
            return res.status(500).json({ message: "Internal server error" })
        }

        res.status(201).json({ message: "Task created", task: task })
    } catch (err) {
        res.status(500).json({ message: "Internal server error", error: err })
    }
}

export const GetTasks = async (req: Request, res: Response) => {
    try {
        const user = CheckRole(req, res)
        let tasksData = []
        if (typeof user === 'object' && 'role' in user && user.role === 'user') {
            tasksData = await db.select().from(tasks).where(eq(tasks.assignee, user.email))
        } else {
            tasksData = await db.select().from(tasks)
        }

        res.status(200).json({ tasks: tasksData })
    } catch (err) {
        res.status(500).json({ message: "Internal server error", error: err })
    }
}

export const UpdateTask = async (req: Request, res: Response) => {
    try {
        const id = req.params.id

        const user = CheckRole(req, res)
        if (typeof user === 'object' && 'role' in user && user.role === 'user') {
            const [task] = await db.select().from(tasks).where(eq(tasks.id, id))
            if(user.email !== task.assignee){
                return res.status(401).json({ message: "Cannot update tasks that are not created by the user" })
            }
        }

        const { name, description, status } = req.body
        const updatedAt = new Date().toISOString()

        const updatedTask = {
            name,
            description,
            status,
            updatedAt
        }

        const taskData = await db.update(tasks).set(updatedTask).where(eq(tasks.id, id))
        if (!taskData) {
            return res.status(500).json({ message: "Failed to update task" })
        }

        res.status(200).json({ message: "Task updated", updated: updatedTask })
    } catch (err) {
        res.status(500).json({ message: "Internal server error", error: err })
    }
}

export const DeleteTask = async (req: Request, res: Response) => {
    try {
        const id = req.params.id

        const user = CheckRole(req, res)
        if (typeof user === 'object' && 'role' in user && user.role === 'user') {
            const [task] = await db.select().from(tasks).where(eq(tasks.id, id))
            if(user.email !== task.assignee){
                return res.status(401).json({ message: "Cannot delete tasks that are not created by the user" })
            }
        }

        const taskData = await db.delete(tasks).where(eq(tasks.id, id))
        if (!taskData) {
            return res.status(500).json({ message: "Failed to delete task" })
        }

        res.status(200).json({ message: "Task deleted" })
    } catch (err) {
        res.status(500).json({ message: "Internal server error", error: err })
    }
}