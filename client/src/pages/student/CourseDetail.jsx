import React from 'react'
import { Button } from "../../../components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../../../components/ui/card";
import { BadgeInfo, PlayCircle } from "lucide-react";
const CourseDetail = () => {
  return (
    <div className='mt-20 space-y-5'><div className='bg-[#2D2F31] text-white'>
        <div className='max-w-7xl mx-auto py-8 px-4 md:px-8 flex flex-col  gap-2'>
           <h1 className='font-bold text-2xl md:text-3xl'>
            Course Title</h1> 
            <p className="text-base md:text-lg">
                Course Sub-Title</p>
                <p>
                    Created By {" "} <span className="text-[#C0C4FC] underline italic">lms administrator</span></p>
                      <div className="flex items-center gap-2 text-sm">
            <BadgeInfo size={16} />
            <p>Last updated 27-05-2025</p>
          </div>
          <p>Students enrolled: {course?.enrolledStudents.length}</p></div></div>
             <div className="max-w-7xl mx-auto my-5 px-4 md:px-8 flex flex-col lg:flex-row justify-between gap-10">
        <div className="w-full lg:w-1/2 space-y-5">
          <h1 className="font-bold text-xl md:text-2xl">Description</h1>
          <p>
            This is a description about ..............please try our course,it will definitely help you in mastering ....with ease.
          </p>
           
          <Card>
            <CardHeader>
              <CardTitle>Course Content</CardTitle>
              <CardDescription>8 lectures</CardDescription>
            </CardHeader>
            <CardContent className="space-y-3">
           {  [1,2,3].map((lecture,idx) => (
                <div key={idx} className='flex items-center gap-3 text-sm'>
                    <span>
                        {
                            true?(<PlayCircle size={14}/>):<Lock size={14}/>
                        }
                    </span>
                    <p>lecture title</p>
                </div>
             ))}
            </CardContent>
          </Card>
        </div>
        
        </div>
      </div>
  )
}

export default CourseDetail