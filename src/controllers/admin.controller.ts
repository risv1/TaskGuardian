import { Request, Response } from "express";
import { db } from "../database/db";
import { users } from "../database/schema";
import { eq } from "drizzle-orm";

export const GetUsers = async(req: Request, res: Response) => {
    try{
        const userData = await db.select().from(users)
        if(!userData){
            return res.status(500).json({ message: "Couldn't fetch users" })
        }

        res.status(200).json({ message: "Users fetched", users: userData })

    }catch(err){
        res.status(500).json({ message: "Internal server error", error: err })
    }
}

export const GetUser = async(req: Request, res: Response) => {
    try{
        const id = req.params.id

        const userData = await db.select().from(users).where(eq(users.id, id))
        if(!userData){
            return res.status(500).json({ message: "Couldn't fetch user" })
        }

        res.status(200).json({ message: "User fetched", user: userData })

    }catch(err){
        res.status(500).json({ message: "Internal server error", error: err })
    }
}

export const ManageUser = async(req: Request, res: Response) => {
    try{
        const id = req.params.id
        const body = req.body

        const newUserData = await db.update(users).set(body).where(eq(users.id, id))
        if(!newUserData){
            return res.status(500).json({ message: "Couldn't update user" })
        }

        res.status(200).json({ message: "User updated", updated: body})

    }catch(err){
        res.status(500).json({ message: "Internal server error", error: err })
    }
}

export const DeleteUser = async(req: Request, res: Response) => {
    try{
        const id = req.params.id
        const body = req.body

        const newUserData = await db.delete(users).where(eq(users.id, id))
        if(!newUserData){
            return res.status(500).json({ message: "Couldn't delete user" })
        }

        res.status(200).json({ message: "User delete" })

    }catch(err){
        res.status(500).json({ message: "Internal server error", error: err })
    }
}