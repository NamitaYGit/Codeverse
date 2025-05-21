import express from "express";
import { createCourse, getCreatorCourses } from "../controllers/course.controller.js";
import isAuthenticated from "../middlewares/isAuthenticated.js";
import upload from "../utils/multer.js";
const router = express.Router();

router.route("/").post(isAuthenticated,createCourse);
router.route("/").get(isAuthenticated,getCreatorCourses);

    //router.route("/:courseId").put(isAuthenticated,upload.single('courseThumbnail'),editCourse);

export default router;
