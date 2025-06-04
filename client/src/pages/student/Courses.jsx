import { Skeleton } from "../../../components/ui/skeleton";
import React, { use } from "react";
import Course from "./Course";
import {useGetPublishedCourseQuery} from "../../features/api/courseApi"

const Courses = () => {
  const {data,isLoading,isError}  =useGetPublishedCourseQuery();
  console.log(data);
  if(isError)return <h1 className="text-[#1c2541] dark:text-[#5bc0be] text-center text-xl">Some error occured while fetching course. </h1>
  return (
    <div className="bg-white dark:bg-[#0b132b] transition-colors duration-300">
      <div className="max-w-7xl mx-auto p-6">
        <h2 className="font-bold text-3xl text-center mb-10 text-[#1c2541] dark:text-white">
          Our Courses</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {isLoading ? (
            Array.from({ length: 8 }).map((_, index) => (
              <CourseSkeleton key={index} />
            ))
          ) : (
      data?.courses &&  data.courses.map((course,index)=><Course key={index} course={course}/>)
          )}
          </div>
      </div>
    </div>
  );
};
export default Courses;

const CourseSkeleton = () => {
  return (
    <div className="bg-white dark:bg-[#1c2541] shadow-md hover:shadow-lg transition-all duration-300 rounded-lg overflow-hidden border border-[#5bc0be]/20 dark:border-[#5bc0be]/30">
      <Skeleton className="w-full h-36 bg-[#5bc0be]/20 dark:bg-[#5bc0be]/30" />
      <div className="px-5 py-4 space-y-3">
        <Skeleton className="h-6 w-3/4 bg-[#3a506b]/20 dark:bg-[#3a506b]/30" />
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Skeleton className="h-6 w-6 rounded-full bg-[#5bc0be]/20 dark:bg-[#5bc0be]/30" />
            <Skeleton className="h-4 w-20 bg-[#3a506b]/20 dark:bg-[#3a506b]/30" />
          </div>
          <Skeleton className="h-4 w-16 bg-[#3a506b]/20 dark:bg-[#3a506b]/30" />
        </div>
        <Skeleton className="h-4 w-1/4 bg-[#5bc0be]/20 dark:bg-[#5bc0be]/30" />
      </div>
    </div>
  );
};