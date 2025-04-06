import { CardContent } from "../../../components/ui/card";
import { Card } from "../../../components/ui/card";
import React from "react";
import { Avatar } from "../../../components/ui/avatar";
import { AvatarFallback, AvatarImage } from"../../../components/ui/avatar";
import { Badge } from "../../../components/ui/badge";

const Course = () => {
  return (
    <Card className="overflow-hidden rounded-lg dark:bg-gray-800 bg-white shadow-lg hover:shadow-2xl transform hover:scale-105 transition-all duration-300 p-0">
  <div className="relative m-0 p-0">
    <img
      src="https://img-c.udemycdn.com/course/750x422/3873464_403c_3.jpg"
      alt="course"
      className="w-full h-36 object-cover rounded-t-lg"
    />
  </div>
      <CardContent className='px-5 py-4 space-y-3'>
        <h1 className="hover:underline font:bold text-lg truncate">
          Next.js Complete course in hindi 2025
        </h1>
        <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <Avatar className='h-8 w-8'>
            <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
            <AvatarFallback>CN</AvatarFallback>
          </Avatar>
          <h1 className="font-medium text-sm">Kirti MernStack</h1>
        </div>
        <Badge className='bg-blue-600 text-white px-2 py-1 text-sm rounded-full'>
            Advance
        </Badge>
        </div>
        <div className="text-lg font-bold">
            <span>₹499</span>
        </div>
      </CardContent>
    </Card>
  );
};
export default Course;
