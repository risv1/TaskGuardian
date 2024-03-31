import express from "express";
import { Login, Logout, Register } from "../controllers/auth.controller";
import { CreateTask, DeleteTask, GetTasks, UpdateTask } from "../controllers/user.controller";
import { IsAuthenticated } from "../middlewares/auth";
import { IsManager } from "../middlewares/manage";
import { AssignTask } from "../controllers/manager.controller";
import { DeleteUser, GetUser, GetUsers, ManageUser } from "../controllers/admin.controller";
import { IsAdmin } from "../middlewares/admin";

export const router = express.Router();
export const userRoutes = express.Router();
export const managerRoutes = express.Router();
export const adminRoutes = express.Router();


adminRoutes.use(IsAdmin)
adminRoutes.get("/users", GetUsers);
adminRoutes.get("/users/:id", GetUser);
adminRoutes.put("/manage/:id", ManageUser);
adminRoutes.delete("/delete/:id", DeleteUser);

managerRoutes.use(IsManager)
managerRoutes.put("/assign/:id", AssignTask);

userRoutes.use(IsAuthenticated)
userRoutes.post("/create_task", CreateTask);
userRoutes.get("/tasks", GetTasks);
userRoutes.put("/update_task/:id", UpdateTask);
userRoutes.delete("/delete_task/:id", DeleteTask);

router.post("/register", Register);
router.post("/login", Login);
router.post("/logout", Logout);
