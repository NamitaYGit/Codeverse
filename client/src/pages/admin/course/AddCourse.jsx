import { Label } from "@radix-ui/react-dropdown-menu";
import { Input } from "../../../../components/ui/input";
import React, { useEffect, useState } from "react";
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from "../../../../components/ui/select";
import { Button } from "../../../../components/ui/button";
import { useNavigate } from "react-router-dom";
import { Loader2 } from "lucide-react";
import { useCreateCourseMutation } from "../../../../src/features/api/courseApi";
import { toast } from "sonner";

const AddCourse = () => {
  const [courseTitle, setCourseTitle] = useState("");
  const [category, setCategory] = useState("");

  const [createCourse, {data, isLoading, error, isSuccess}] = useCreateCourseMutation();

  const navigate = useNavigate();
  const getSelectedCategory = (value) => {
    setCategory(value);
  }
  const createCourseHandler = async() => {
    await createCourse({
      courseTitle, category
    });
  }
  //for displaying toast
  useEffect(() => {
    if(isSuccess) {
      toast.success(data?.message || "Course created.");
      navigate("/admin/course");
    }
  }, [isSuccess, error]);
  
  return (
    <div className="flex-1 mx-10 mt-15 min-h-screen bg-[#ffffff] dark:bg-[#0B132B] transition-colors duration-300">
      <div className="mb-8 p-6 bg-gradient-to-r from-[#5BC0BE]/10 to-[#3A506B]/10 rounded-lg border border-[#5BC0BE]/20 dark:border-[#5BC0BE]/30">
        <h1 className="font-bold text-2xl text-[#0B132B] dark:text-[#ffffff] mb-3">
          Let's add a course
        </h1>
        <p className="text-sm text-[#3A506B] dark:text-[#5BC0BE]/80 leading-relaxed">
          Add some basic course details for your new course. You can always edit these details later from the course dashboard.
        </p>
      </div>
      
      <div className="space-y-6 bg-[#ffffff] dark:bg-[#1C2541] p-6 rounded-lg border border-[#5BC0BE]/20 dark:border-[#5BC0BE]/30 shadow-lg">
        <div className="space-y-2">
          <Label className="text-[#1C2541] dark:text-[#5BC0BE] font-medium">Course Title</Label>
          <Input
            type="text"
            name="courseTitle"
            value={courseTitle}
            onChange={(e) => setCourseTitle(e.target.value)}
            placeholder="Enter your course name"
            className="border-[#5BC0BE]/30 focus:border-[#5BC0BE] focus:ring-[#5BC0BE]/20 bg-[#ffffff] dark:bg-[#0B132B] text-[#0B132B] dark:text-[#ffffff] transition-all duration-300"
          />
        </div>
        
        <div className="space-y-2">
          <Label className="text-[#1C2541] dark:text-[#5BC0BE] font-medium">Category</Label>
          <Select onValueChange={getSelectedCategory}>
            <SelectTrigger className="w-full border-[#5BC0BE]/30 focus:border-[#5BC0BE] focus:ring-[#5BC0BE]/20 bg-[#ffffff] dark:bg-[#0B132B] text-[#0B132B] dark:text-[#ffffff] transition-all duration-300">
              <SelectValue placeholder="Select a category" />
            </SelectTrigger>
            <SelectContent className="bg-[#ffffff] dark:bg-[#1C2541] border border-[#5BC0BE]/20 dark:border-[#5BC0BE]/30">
              <SelectGroup>
                <SelectLabel className="text-[#1C2541] dark:text-[#5BC0BE]">Category</SelectLabel>
                <SelectItem value="Next JS" className="hover:bg-[#5BC0BE]/10 focus:bg-[#5BC0BE]/10 text-[#0B132B] dark:text-[#ffffff]">Next JS</SelectItem>
                <SelectItem value="Data Science" className="hover:bg-[#5BC0BE]/10 focus:bg-[#5BC0BE]/10 text-[#0B132B] dark:text-[#ffffff]">Data Science</SelectItem>
                <SelectItem value="Fullstack Development" className="hover:bg-[#5BC0BE]/10 focus:bg-[#5BC0BE]/10 text-[#0B132B] dark:text-[#ffffff]">Fullstack Development</SelectItem>
                <SelectItem value="MERN Stack Development" className="hover:bg-[#5BC0BE]/10 focus:bg-[#5BC0BE]/10 text-[#0B132B] dark:text-[#ffffff]">MERN Stack Development</SelectItem>
                <SelectItem value="Python" className="hover:bg-[#5BC0BE]/10 focus:bg-[#5BC0BE]/10 text-[#0B132B] dark:text-[#ffffff]">Python</SelectItem>
                <SelectItem value="Docker" className="hover:bg-[#5BC0BE]/10 focus:bg-[#5BC0BE]/10 text-[#0B132B] dark:text-[#ffffff]">Docker</SelectItem>
                <SelectItem value="HTML" className="hover:bg-[#5BC0BE]/10 focus:bg-[#5BC0BE]/10 text-[#0B132B] dark:text-[#ffffff]">HTML</SelectItem>
                <SelectItem value="Javascript" className="hover:bg-[#5BC0BE]/10 focus:bg-[#5BC0BE]/10 text-[#0B132B] dark:text-[#ffffff]">Javascript</SelectItem>
                <SelectItem value="MongoDB" className="hover:bg-[#5BC0BE]/10 focus:bg-[#5BC0BE]/10 text-[#0B132B] dark:text-[#ffffff]">MongoDB</SelectItem>
              </SelectGroup>
            </SelectContent>
          </Select>
        </div>
        
        <div className="flex items-center gap-4 pt-4">
          <Button 
            variant="outline" 
            onClick={() => navigate("/admin/course")}
            className="border-[#5BC0BE]/30 text-[#3A506B] dark:text-[#5BC0BE] hover:bg-[#5BC0BE]/10 hover:border-[#5BC0BE] transition-all duration-300"
          >
            Back
          </Button>
          <Button 
            disabled={isLoading} 
            onClick={createCourseHandler}
            className="bg-gradient-to-r from-[#5BC0BE] to-[#3A506B] hover:from-[#3A506B] hover:to-[#1C2541] text-white border-0 transition-all duration-300 hover:shadow-lg disabled:opacity-50"
          >
            {isLoading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin"/>
                Please wait
              </>
            ) : "Create Course"}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default AddCourse;