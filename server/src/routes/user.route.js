import express from "express";


import upload from "../utils/multer.js";
//import { uploadMedia } from "../utils/cloudinary.js";

import {
    register,
    login,
    googleLogin,
    githubLogin,
    githubCallback,
    getUserProfile,
    logout, updateProfile
} from "../controllers/user.controller.js";
import isAuthenticated from "../middlewares/isAuthenticated.js";
const router = express.Router();

router.post("/register", register);
router.post("/login", login);
router.post("/google-login", googleLogin);
router.post("/github-login", githubLogin);
router.get("/github-callback", githubCallback);

router.route("/logout").get(logout);
router.route("/profile").get(isAuthenticated, getUserProfile);
router.route("/profile/update").put(isAuthenticated, upload.single("profilePhoto"), updateProfile);
export default router;

