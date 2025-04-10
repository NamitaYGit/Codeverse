import express from "express";
import { register,login,googleLogin } from "../controllers/user.controller.js";

const router =express.Router();
router.route("/register").post(register);
router.route("/login").post(login);
router.route("/google-login").post(googleLogin); 
export  default  router;