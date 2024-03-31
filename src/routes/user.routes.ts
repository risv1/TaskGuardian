import express from "express";
import { HelloWorld } from "../controllers/user.controller";
import { Login, Logout, Register } from "../controllers/auth.controller";

export const router = express.Router();

router.get("/", HelloWorld);

router.post("/register", Register);
router.post("/login", Login);
router.post("/logout", Logout);
