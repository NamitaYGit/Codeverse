import { Badge } from "../../../components/ui/badge";
import { Button } from "../../../components/ui/button";
import { Card, CardContent, CardTitle } from "../../../components/ui/card";
import {
  useCompleteCourseMutation,
  useGetCourseProgressQuery,
  useInCompleteCourseMutation,
  useUpdateLectureProgressMutation,
} from "@/features/api/courseProgressApi";
import { CheckCircle, CheckCircle2, CirclePlay } from "lucide-react";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { toast } from "sonner";

const CourseProgress = () => {
  const params = useParams();
  const courseId = params.courseId;
  const { data, isLoading, isError, refetch } = useGetCourseProgressQuery(courseId);

  const [updateLectureProgress] = useUpdateLectureProgressMutation();
  const [
    completeCourse,
    { data: markCompleteData, isSuccess: completedSuccess },
  ] = useCompleteCourseMutation();
  const [
    inCompleteCourse,
    { data: markInCompleteData, isSuccess: inCompletedSuccess },
  ] = useInCompleteCourseMutation();

  useEffect(() => {
    if (completedSuccess) {
      refetch();
      toast.success(markCompleteData.message);
    }
    if (inCompletedSuccess) {
      refetch();
      toast.success(markInCompleteData.message);
    }
  }, [completedSuccess, inCompletedSuccess]);

  const [currentLecture, setCurrentLecture] = useState(null);

  if (isLoading) return <p>Loading…</p>;
  if (isError) return <p className="text-red-500">Failed to load course details</p>;

  const { courseDetails, progress, completed } = data.data;
  const { courseTitle } = courseDetails;

  // Default to the first lecture if none selected
  const initialLecture =
    currentLecture || (courseDetails.lectures && courseDetails.lectures[0]);

  const isLectureCompleted = (lectureId) => {
    return progress.some((prog) => prog.lectureId === lectureId && prog.viewed);
  };

  const handleLectureProgress = async (lectureId) => {
    await updateLectureProgress({ courseId, lectureId });
    refetch();
  };

  const handleSelectLecture = (lecture) => {
    setCurrentLecture(lecture);
    handleLectureProgress(lecture._id);
  };

  const handleCompleteCourse = async () => {
    await completeCourse(courseId);
  };
  const handleInCompleteCourse = async () => {
    await inCompleteCourse(courseId);
  };

  return (
    <div className="max-w-7xl mx-auto p-4">
      {/* Course Title + Complete Button */}
      <div className="flex justify-between mb-4">
        <h1 className="text-2xl font-bold text-[#1C2541] dark:text-[#5BC0BE]">
          {courseTitle}
        </h1>
        <Button
          onClick={completed ? handleInCompleteCourse : handleCompleteCourse}
          className={`
            ${completed ? "bg-transparent border-[#5BC0BE] text-[#5BC0BE]" : "bg-[#5BC0BE] text-[#ffffff]"}
            hover:${completed ? "bg-[#5BC0BE]/10 text-[#5BC0BE]" : "bg-[#3A506B] text-[#ffffff]"}
            border rounded
          `}
        >
          {completed ? (
            <div className="flex items-center">
              <CheckCircle className="h-4 w-4 mr-2 text-[#5BC0BE]" />
              <span>Completed</span>
            </div>
          ) : (
            "Mark as completed"
          )}
        </Button>
      </div>

      <div className="flex flex-col md:flex-row gap-6">
        {/* Video Section */}
        <div className="
          flex-1 md:w-3/5 h-fit
          bg-[#ffffff] dark:bg-[#1C2541]
          rounded-lg shadow-lg p-4
        ">
          <div>
            <video
              src={currentLecture?.videoUrl || initialLecture.videoUrl}
              controls
              className="w-full h-auto md:rounded-lg"
              onPlay={() =>
                handleLectureProgress(currentLecture?._id || initialLecture._id)
              }
            />
          </div>
          <div className="mt-2">
            <h3 className="font-medium text-lg text-[#1C2541] dark:text-[#ffffff]">
              {`Lecture ${
                courseDetails.lectures.findIndex(
                  (lec) =>
                    lec._id === (currentLecture?._id || initialLecture._id)
                ) + 1
              } : ${
                currentLecture?.lectureTitle || initialLecture.lectureTitle
              }`}
            </h3>
          </div>
        </div>

        {/* Lecture Sidebar */}
        <div className="
          flex flex-col w-full md:w-2/5 
          border-t md:border-t-0 md:border-l 
            border-[#3A506B]/20 dark:border-[#5BC0BE]/50
          md:pl-4 pt-4 md:pt-0
        ">
          <h2 className="font-semibold text-xl mb-4 text-[#1C2541] dark:text-[#5BC0BE]">
            Course Lecture
          </h2>
          <div className="flex-1 overflow-y-auto">
            {courseDetails?.lectures.map((lecture) => (
              <Card
                key={lecture._id}
                className={`
                  mb-3 hover:cursor-pointer transition transform
                  ${lecture._id === currentLecture?._id
                    ? "bg-[#3A506B]/10 dark:bg-[#3A506B]/20"
                    : "bg-transparent"
                  }
                `}
                onClick={() => handleSelectLecture(lecture)}
              >
                <CardContent className="flex items-center justify-between p-4">
                  <div className="flex items-center">
                    {isLectureCompleted(lecture._id) ? (
                      <CheckCircle2 className="text-[#5BC0BE] mr-2" size={24} />
                    ) : (
                      <CirclePlay className="text-[#3A506B] mr-2" size={24} />
                    )}
                    <div>
                      <CardTitle className="text-lg font-medium text-[#1C2541] dark:text-[#ffffff]">
                        {lecture.lectureTitle}
                      </CardTitle>
                    </div>
                  </div>
                  {isLectureCompleted(lecture._id) && (
                    <Badge className="
                      bg-[#5BC0BE]/20
                      text-[#5BC0BE]
                      border-[#5BC0BE]
                    ">
                      Completed
                    </Badge>
                  )}
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CourseProgress;
