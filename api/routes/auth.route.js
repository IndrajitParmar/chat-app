import express from "express";
import {
  registerUser,
  loginUser,
  signOut,
} from "../controller/auth.controller.js";

const router = express.Router();

router.post("/register", registerUser);
router.post("/login", loginUser);
router.get("/signout", signOut);

export default router;
