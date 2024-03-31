import express from "express";
import { Login, Logout, Register } from "../controllers/auth.controller";
import { CreateTask, DeleteTask, GetTasks, UpdateTask } from "../controllers/user.controller";

export const router = express.Router();

router.get("/tasks", GetTasks);
router.put("/update_task/:id", UpdateTask);
router.delete("/delete_task/:id", DeleteTask);

router.post("/create_task", CreateTask);
router.post("/register", Register);
router.post("/login", Login);
router.post("/logout", Logout);
