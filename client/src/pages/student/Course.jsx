import { CardContent } from "../../../components/ui/card";
import { Card } from "../../../components/ui/card";
import React from "react";
import { Avatar } from "../../../components/ui/avatar";
import { AvatarFallback, AvatarImage } from"../../../components/ui/avatar";
import { Badge } from "../../../components/ui/badge";
import { Link } from "react-router-dom";

const Course = ({course}) => {
  return (
    <Link to={`course-detail/${course._id}`} >
      <Card className="overflow-hidden rounded-lg bg-[#ffffff] dark:bg-[#1C2541] border border-[#5BC0BE]/20 dark:border-[#5BC0BE]/30 shadow-lg hover:shadow-2xl transform hover:scale-105 transition-all duration-300 p-0 group">
        <div className="relative m-0 p-0 overflow-hidden">
          <img
            src={course.courseThumbnail}
            alt="course"
            className="w-full h-36 object-cover transition-transform duration-300 group-hover:scale-110"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#0B132B]/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
        </div>
        <CardContent className='px-5 py-4 space-y-3'>
          <h1 className="hover:underline font-bold text-lg truncate text-[#0B132B] dark:text-[#ffffff] group-hover:text-[#3A506B] dark:group-hover:text-[#5BC0BE] transition-colors duration-300">
            {course.courseTitle}
          </h1>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Avatar className='h-8 w-8 ring-2 ring-[#5BC0BE]/20'>
                <AvatarImage src={course.creator?.photoUrl||"https://github.com/shadcn.png"} alt="@shadcn" />
                <AvatarFallback className="bg-gradient-to-br from-[#5BC0BE] to-[#3A506B] text-white text-xs">CN</AvatarFallback>
              </Avatar>
              <h1 className="font-medium text-sm text-[#3A506B] dark:text-[#5BC0BE]/80">
                {course.creator?.name}
              </h1>
            </div>
            <Badge className='bg-[#2d8c8a] text-white px-3 py-1 text-sm rounded-full border-0 shadow-md hover:from-[#3A506B] hover:to-[#1C2541] transition-all duration-300'>
              {course.courseLevel}
            </Badge>
          </div>
          <div className="text-lg font-bold">
            <span className="text-[#0B132B] dark:text-[#ffffff] bg-[#5BC0BE] bg-clip-text ">
              ₹{course.coursePrice}
            </span>
          </div>
        </CardContent>
      </Card>
    </Link>
  );
};

export default Course;