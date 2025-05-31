import { Course } from "../models/course.model.js";
import { CourseProgress } from "../models/courseProgress.model.js";

export const getCourseProgress= async (req, res) => {
    try{
       const {courseId}=req.params;
       const userId=req.id;

       // Fetch course progress for the user
       let courseProgress =await CourseProgress.findOne({courseId,userId}).populate("courseId");
       const courseDetails = await Course.findById(courseId);
       if(!courseDetails)
       {
          return res.status(404).json({ message: "Course not found!" })
       }
       // If course progress not found,return course details with empty progress
       if(!courseProgress)
       {
         return res.status(200).json({ 
            data:{
                courseDetails,
                progress:[],
                completed:false
            }
          })
       }
//return course details with progress
       return res.status(200).json({
          data:{
            courseDetails,
            progress:courseProgress.lectureProgress,
            completed:courseProgress.completed
          }
       })
    } catch(error)
    {
        console.log(error);
    }}
    export const updateLectureProgress = async (req, res) => {

    try {
        const { courseId, lectureId } = req.params;
        const userId = req.id;

        // Find the course progress for the user by creating or fetching
        let courseProgress = await CourseProgress.findOne({ courseId, userId });

        // If no progress exists, create a new record
        if (!courseProgress) {
            courseProgress =  new CourseProgress({
                userId,
                courseId,
                completed: false,
                lectureProgress: []
            });
        }

        // Check if the lecture is already marked as viewed
        const lectureIndex = courseProgress.lectureProgress.findIndex(
            (lecture) => lecture.lectureId === lectureId
        );

        if (lectureIndex > -1) {
            // If already viewed, toggle the viewed status
            courseProgress.lectureProgress[lectureIndex].viewed =true
                } else {
            // If not viewed, add it to the progress
            courseProgress.lectureProgress.push({
                lectureId,
                viewed: true
            });
        }

        // Check if all lectures are viewed to mark the course as completed
      const lectureProgressLength= courseProgress.lectureProgress.filter((lectureProg)=>lectureProg.viewed).length;
      const course=await Course.findById(courseId);
      if(course.lectures.length=== lectureProgressLength)
        {
            courseProgress.completed = true;
        }
        // Save the updated progress
        await courseProgress.save();

        return res.status(200).json({
            message: "Lecture progress updated successfully",
           
        });
    } catch (error) {
        console.error(error);
         }};
export const markAsCompleted  = async (req, res) => {
    try{
        const { courseId } = req.params;
        const userId = req.id;
        const courseProgress = await CourseProgress.findOne({ courseId, userId });
        if (!courseProgress) {
            return res.status(404).json({ message: "Course progress not found" });

        }
        courseProgress.lectureProgress.map((lectureprogress)=> lectureprogress.viewed=true);
        courseProgress.completed = true;
        await courseProgress.save();
        return res.status(200).json({
            message: "Course marked as completed successfully",
      
        });
    }
    catch(error){
        console.log(error);
    }}

    export const markAsInCompleted  = async (req, res) => {
    try{
        const { courseId } = req.params;
        const userId = req.id;
        const courseProgress = await CourseProgress.findOne({ courseId, userId });
        if (!courseProgress) {
            return res.status(404).json({ message: "Course progress not found" });

        }
        courseProgress.lectureProgress.map((lectureprogress)=> (lectureprogress.viewed=false));
        courseProgress.completed = false;
        await courseProgress.save();
        return res.status(200).json({
            message: "Course marked as Incompleted successfully",
      
        });
    }
    catch(error){
        console.log(error);
    }}
    