import express from "express";
import {
  register,
  login,
  googleLogin,
  githubLogin,
  githubCallback,
  getUserProfile,
  logout,
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
export default router;
