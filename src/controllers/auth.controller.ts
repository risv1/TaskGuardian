import { Request, Response } from "express";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { v4 as uuid } from "uuid";
import { db } from "../database/db";
import { users } from "../database/schema";
import { eq } from "drizzle-orm";
import { config } from "dotenv";

config();

export const Register = async (req: Request, res: Response) => {
  try {
    const {name, email, password} = req.body;
    const id = uuid();
    const createdAt = new Date().toISOString();
    const updatedAt = new Date().toISOString();

    const passwordHash = await bcrypt.hash(password, 10);

    const user = {
      id: id,
      name: name,
      email: email,
      password: passwordHash,
      createdAt,
      updatedAt,
      role: "user",
    };

    const checkExistsUser = await db
      .select()
      .from(users)
      .where(eq(users.email, user.email));
    if (checkExistsUser.length > 0) {
      return res.status(400).json({ message: "User already exists" });
    }

    const userDb = await db.insert(users).values(user);
    if (!userDb) {
      return res.status(500).json({ message: "Internal server error" });
    }

    res.status(201).json({ message: "User created", user: user });
  } catch (err) {
    res.status(500).json({ message: "Internal server error", error: err });
  }
};

export const Login = async (req: Request, res: Response) => {
  try {
    const body = req.body;

    const [user] = await db
      .select()
      .from(users)
      .where(eq(users.email, body.email));

    if (!user) {
      return res.status(401).json({ message: "User not found" });
    }

    const passwordMatch = await bcrypt.compare(body.password, user.password);
    if (!passwordMatch) {
      return res.status(401).json({ message: "Invalid password" });
    }

    const userData = {
        id: user.id,
        name: user.name,
        email: user.email,
        role: user.role,
    }

    const token = jwt.sign(userData, process.env.JWT_SECRET!);

    res.cookie("token", token, {
      httpOnly: true,
      expires: new Date(Date.now() + 24 * 3600000),
    });
    if(!token) {
        return res.status(500).json({ message: "Token not created" });
    }

    res.status(200).json({ message: "Logged in", user: {
        name: user.name,
        email: user.email,
    } });

  } catch (err) {
    res.status(500).json({ message: "Internal server error", error: err });
  }
};

export const Logout = async (req: Request, res: Response) => {
    const token = req.cookies.token
    if (!token) {
        return res.status(401).json({ message: "Unauthorized" })
    }

    res.clearCookie("token")
    res.status(200).json({ message: "Logged out" })
}