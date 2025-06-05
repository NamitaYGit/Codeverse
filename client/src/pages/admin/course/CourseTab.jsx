import { Label } from "@radix-ui/react-dropdown-menu";
import { Button } from "../../../../components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../../../../components/ui/card";
import React, { useEffect, useState } from "react";
import { Input } from "../../../../components/ui/input";
import RichTextEditor from "../../../../components/RichTextEditor";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "../../../../components/ui/select";
import { Loader2 } from "lucide-react";
import { useNavigate, useParams } from "react-router-dom";
import EditCourse from "./EditCourse";
import {
  useEditCourseMutation,
  useGetCourseByIdQuery,
  usePublishCourseMutation,
  useRemoveCourseMutation,
} from "../../../../src/features/api/courseApi";
import { toast } from "sonner";

const CourseTab = () => {
  const [input, setInput] = useState({
    courseTitle: "",
    subTitle: "",
    description: "",
    category: "",
    courseLevel: "",
    coursePrice: "",
    courseThumbnnail: "",
  });
  const params = useParams();
  const courseId = params.courseId;
  const { data: courseByIdData, isLoading: courseByIdIsLoading, refetch } =
    useGetCourseByIdQuery(courseId, {refetchOnMountOrArgChange:true});
  const [publishCourse, {}] = usePublishCourseMutation();
  const [
      removeCourse,
      {
        data: removeData,
        isLoading: removeIsLoading,
        isSuccess: removeIsSuccess,
      },
    ] = useRemoveCourseMutation();
  useEffect(() => {
    if (courseByIdData?.course) {
      const course = courseByIdData?.course;
      setInput({
        courseTitle: course.courseTitle,
        subTitle: course.subTitle,
        description: course.description,
        category: course.category,
        courseLevel: course.courseLevel,
        coursePrice: course.coursePrice,
        courseThumbnnail: course.courseThumbnnail,
      });
    }
  }, [courseByIdData]);
  const changeEventHandler = (e) => {
    const { name, value } = e.target;
    setInput({ ...input, [name]: value });
  };
  const selectCategory = (value) => {
    setInput({ ...input, category: value });
  };
  const selectCourseLevel = (value) => {
    setInput({ ...input, courseLevel: value });
  };
  const [previewThumbnail, setPreviewThumbnail] = useState("");
  const selectThumbnail = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      setInput({ ...input, courseThumbnnail: file });
      const fileReader = new FileReader();
      fileReader.onloadend = () => setPreviewThumbnail(fileReader.result);
      fileReader.readAsDataURL(file);
    }
  };
  

  const [editCourse , { data, isLoading, isSuccess, error }] =
    useEditCourseMutation();
  const updateCourseHandler = async () => {
    const formData = new FormData();
    formData.append("courseTitle", input.courseTitle);
    formData.append("subTitle", input.subTitle);
    formData.append("description", input.description);
    formData.append("category", input.category);
    formData.append("courseLevel", input.courseLevel);
    formData.append("coursePrice", input.coursePrice);

    if (input.courseThumbnnail) {
      formData.append("courseThumbnail", input.courseThumbnnail);
    }

    await editCourse({ formData, courseId });
  };

  const removeCourseHandler = async () => {
    await removeCourse(courseId);
  };

 const publishStatusHandler= async (action) =>{
   try {
    const response=await publishCourse({courseId,query:action});
    if(response.data){
      refetch();
      toast.success(response.data.message);
    }
   } catch (error) {
    toast.error("Failed to publish or unpublish course");
   }
 }
  useEffect(() => {
    if (isSuccess) {
      toast.success(data.message || "Course updated.");
    }
    if (error) {
      toast.error(error.data.message || "Failed to update course.");
    }
  }, [isSuccess, error]);
  useEffect(() => {
      if (removeIsSuccess) toast.success(removeData.message);
    }, [removeIsSuccess]);
  const navigate = useNavigate();
  if(courseByIdIsLoading) return (
    <div className="flex items-center justify-center min-h-screen bg-[#ffffff] dark:bg-[#0B132B]">
      <Loader2 className="h-8 w-8 animate-spin text-[#5BC0BE]"/>
    </div>
  );

  return (
    <div className="min-h-screen bg-[#ffffff] dark:bg-[#0B132B] transition-colors duration-300 p-6">
      <Card className="bg-[#ffffff] dark:bg-[#1C2541] border border-[#5BC0BE]/20 dark:border-[#5BC0BE]/30 shadow-lg">
        <CardHeader className="flex flex-row justify-between bg-gradient-to-r from-[#5BC0BE]/10 to-[#3A506B]/10 rounded-t-lg">
          <div>
            <CardTitle className="text-[#0B132B] dark:text-[#ffffff] text-xl">
              Basic Course Information
            </CardTitle>
            <CardDescription className="text-[#3A506B] dark:text-[#5BC0BE]/80">
              Make changes to your course. Click save when you're done.
            </CardDescription>
          </div>
          <div className="space-x-3">
            <Button 
              disabled={courseByIdData?.course.lectures.length === 0} 
              variant="outline" 
              onClick={() => publishStatusHandler(courseByIdData?.course.isPublished ? "false" : "true")}
              className={`border-[#5BC0BE]/30 transition-all duration-300 ${
                courseByIdData?.course.isPublished 
                  ? 'text-orange-600 dark:text-orange-400 hover:bg-orange-50 dark:hover:bg-orange-900/20 hover:border-orange-400' 
                  : 'text-green-600 dark:text-green-400 hover:bg-green-50 dark:hover:bg-green-900/20 hover:border-green-400'
              }`}
            >
              {courseByIdData?.course.isPublished ? "Unpublish" : "Publish"}
            </Button>
            <Button
              disabled={removeIsLoading}
              onClick={removeCourseHandler}
              variant="destructive"
              className="bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 text-white border-0 transition-all duration-300 hover:shadow-lg"
            >
              {removeIsLoading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Please wait
                </>
              ) : (
                "Remove Course"
             )}
            </Button>
          </div>
        </CardHeader>
        <CardContent className="p-6">
          <div className="space-y-6 mt-5">
            <div className="space-y-2">
              <Label className="text-[#1C2541] dark:text-[#5BC0BE] font-medium">Course Title</Label>
              <Input
                type="text"
                name="courseTitle"
                value={input.courseTitle}
                onChange={changeEventHandler}
                placeholder="Eg: Fullstack developer"
                className="border-[#5BC0BE]/30 focus:border-[#5BC0BE] focus:ring-[#5BC0BE]/20 bg-[#ffffff] dark:bg-[#0B132B] text-[#0B132B] dark:text-[#ffffff] transition-all duration-300"
              />
            </div>
            <div className="space-y-2">
              <Label className="text-[#1C2541] dark:text-[#5BC0BE] font-medium">Subtitle</Label>
              <Input
                type="text"
                name="subTitle"
                value={input.subTitle}
                onChange={changeEventHandler}
                placeholder="Eg: Become a fullstack developer in one month"
                className="border-[#5BC0BE]/30 focus:border-[#5BC0BE] focus:ring-[#5BC0BE]/20 bg-[#ffffff] dark:bg-[#0B132B] text-[#0B132B] dark:text-[#ffffff] transition-all duration-300"
              />
            </div>
            <div className="space-y-2">
              <Label className="text-[#1C2541] dark:text-[#5BC0BE] font-medium">Description</Label>
              <RichTextEditor input={input} setInput={setInput} />
            </div>
            <div className="flex items-center gap-6 flex-wrap">
              <div className="space-y-2 min-w-[200px]">
                <Label className="text-[#1C2541] dark:text-[#5BC0BE] font-medium">Category</Label>
                <Select onValueChange={selectCategory}>
                  <SelectTrigger className="border-[#5BC0BE]/30 focus:border-[#5BC0BE] focus:ring-[#5BC0BE]/20 bg-[#ffffff] dark:bg-[#0B132B] text-[#0B132B] dark:text-[#ffffff] transition-all duration-300">
                    <SelectValue placeholder="Select a category" />
                  </SelectTrigger>
                  <SelectContent className="bg-[#ffffff] dark:bg-[#1C2541] border border-[#5BC0BE]/20 dark:border-[#5BC0BE]/30">
                    <SelectGroup>
                      <SelectLabel className="text-[#1C2541] dark:text-[#5BC0BE]">Category</SelectLabel>
                      <SelectItem value="Next.js" className="hover:bg-[#5BC0BE]/10 focus:bg-[#5BC0BE]/10 text-[#0B132B] dark:text-[#ffffff]">Next.js</SelectItem>
                      <SelectItem value="Data Science" className="hover:bg-[#5BC0BE]/10 focus:bg-[#5BC0BE]/10 text-[#0B132B] dark:text-[#ffffff]">Data Science</SelectItem>
                      <SelectItem value="Fullstack Development" className="hover:bg-[#5BC0BE]/10 focus:bg-[#5BC0BE]/10 text-[#0B132B] dark:text-[#ffffff]">
                        Fullstack Development
                      </SelectItem>
                      <SelectItem value="MERN Stack Development" className="hover:bg-[#5BC0BE]/10 focus:bg-[#5BC0BE]/10 text-[#0B132B] dark:text-[#ffffff]">
                        MERN Stack Development
                      </SelectItem>
                      <SelectItem value="Python" className="hover:bg-[#5BC0BE]/10 focus:bg-[#5BC0BE]/10 text-[#0B132B] dark:text-[#ffffff]">Python</SelectItem>
                      <SelectItem value="Docker" className="hover:bg-[#5BC0BE]/10 focus:bg-[#5BC0BE]/10 text-[#0B132B] dark:text-[#ffffff]">Docker</SelectItem>
                      <SelectItem value="HTML" className="hover:bg-[#5BC0BE]/10 focus:bg-[#5BC0BE]/10 text-[#0B132B] dark:text-[#ffffff]">HTML</SelectItem>
                      <SelectItem value="Javascript" className="hover:bg-[#5BC0BE]/10 focus:bg-[#5BC0BE]/10 text-[#0B132B] dark:text-[#ffffff]">Javascript</SelectItem>
                      <SelectItem value="MongoDB" className="hover:bg-[#5BC0BE]/10 focus:bg-[#5BC0BE]/10 text-[#0B132B] dark:text-[#ffffff]">MongoDB</SelectItem>
                    </SelectGroup>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2 min-w-[200px]">
                <Label className="text-[#1C2541] dark:text-[#5BC0BE] font-medium">Course Level</Label>
                <Select onValueChange={selectCourseLevel}>
                  <SelectTrigger className="border-[#5BC0BE]/30 focus:border-[#5BC0BE] focus:ring-[#5BC0BE]/20 bg-[#ffffff] dark:bg-[#0B132B] text-[#0B132B] dark:text-[#ffffff] transition-all duration-300">
                    <SelectValue placeholder="Select a course level" />
                  </SelectTrigger>
                  <SelectContent className="bg-[#ffffff] dark:bg-[#1C2541] border border-[#5BC0BE]/20 dark:border-[#5BC0BE]/30">
                    <SelectGroup>
                      <SelectLabel className="text-[#1C2541] dark:text-[#5BC0BE]">Course Level</SelectLabel>
                      <SelectItem value="Beginner" className="hover:bg-[#5BC0BE]/10 focus:bg-[#5BC0BE]/10 text-[#0B132B] dark:text-[#ffffff]">Beginner</SelectItem>
                      <SelectItem value="Medium" className="hover:bg-[#5BC0BE]/10 focus:bg-[#5BC0BE]/10 text-[#0B132B] dark:text-[#ffffff]">Medium</SelectItem>
                      <SelectItem value="Advance" className="hover:bg-[#5BC0BE]/10 focus:bg-[#5BC0BE]/10 text-[#0B132B] dark:text-[#ffffff]">Advance</SelectItem>
                    </SelectGroup>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2 min-w-[150px]">
                <Label className="text-[#1C2541] dark:text-[#5BC0BE] font-medium">Price (INR)</Label>
                <Input
                  type="number"
                  name="coursePrice"
                  value={input.coursePrice}
                  onChange={changeEventHandler}
                  placeholder="199"
                  className="border-[#5BC0BE]/30 focus:border-[#5BC0BE] focus:ring-[#5BC0BE]/20 bg-[#ffffff] dark:bg-[#0B132B] text-[#0B132B] dark:text-[#ffffff] transition-all duration-300"
                />
              </div>
            </div>
            <div className="space-y-3">
              <Label className="text-[#1C2541] dark:text-[#5BC0BE] font-medium">Course Thumbnail</Label>
              <Input
                type="file"
                onChange={selectThumbnail}
                accept="image/*"
                className="border-[#5BC0BE]/30 focus:border-[#5BC0BE] focus:ring-[#5BC0BE]/20 bg-[#ffffff] dark:bg-[#0B132B] text-[#0B132B] dark:text-[#ffffff] transition-all duration-300 file:bg-gradient-to-r file:from-[#5BC0BE] file:to-[#3A506B] file:text-white file:border-0 file:rounded-md file:px-4 file:py-2 file:mr-4"
              />
              {previewThumbnail && (
                <div className="mt-4 p-4 bg-gradient-to-r from-[#5BC0BE]/10 to-[#3A506B]/10 rounded-lg border border-[#5BC0BE]/20 dark:border-[#5BC0BE]/30">
                  <img
                    src={previewThumbnail}
                    className="w-64 h-36 object-cover rounded-lg shadow-md"
                    alt="Course Thumbnail Preview"
                  />
                </div>
              )}
            </div>
            <div className="flex flex-row gap-4 pt-6 border-t border-[#5BC0BE]/20 dark:border-[#5BC0BE]/30">
              <Button
                onClick={() => navigate("/admin/course")}
                variant="outline"
                className="border-[#5BC0BE]/30 text-[#3A506B] dark:text-[#5BC0BE] hover:bg-[#5BC0BE]/10 hover:border-[#5BC0BE] transition-all duration-300"
              >
                Cancel
              </Button>
              <Button 
                onClick={updateCourseHandler} 
                disabled={isLoading}
                className="bg-gradient-to-r from-[#5BC0BE] to-[#3A506B] hover:from-[#3A506B] hover:to-[#1C2541] text-white border-0 transition-all duration-300 hover:shadow-lg disabled:opacity-50"
              >
                {isLoading ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Please wait
                  </>
                ) : (
                  "Save Changes"
                )}
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default CourseTab;
