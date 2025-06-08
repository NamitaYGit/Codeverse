import { TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow,Table, TableFooter } from "../../../../components/ui/table";
import { Button} from "../../../../components/ui/button";
import { Badge } from "../../../../components/ui/badge";
import React from "react";
import { useNavigate } from "react-router-dom";
import { useGetCreatorCourseQuery } from "../../../../src/features/api/courseApi";
import { Edit } from "lucide-react";
  
const CourseTable = () => {
  const {data,isLoading}=useGetCreatorCourseQuery();
  const navigate=useNavigate();
  if(isLoading) return <h1>Loading...</h1>
  // console.log("data->",data);
  return (
    <div className="mt-15 overflow-x-auto bg-white dark:bg-[#1e1e1e] p-6 rounded-md shadow text-black dark:text-white">
      <Button onClick={()=>navigate(`create`)}>Create a new course</Button>
      <Table className="mt-5 min-w-full">
      <TableCaption>A list of your recent courses.</TableCaption>
      <TableHeader>
        <TableRow  className="bg-gray-200 dark:bg-gray-800">
          <TableHead className=" px-4 py-2 w-[100px]">Price</TableHead>
          <TableHead className="px-4 py-2" >Status</TableHead>
          <TableHead className="px-4 py-2" >Title</TableHead>
          <TableHead className=" px-4 py-2 text-right">Action</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {data?.courses.map((course) => (
          <TableRow className="border-b border-gray-300 dark:border-gray-700" key={course._id}>
            <TableCell className=" px-4 py-2 font-medium">{course?.coursePrice || "NA"}</TableCell>
            <TableCell className="px-4 py-2" ><Badge>{course.isPublished?"Published":"Draft"}</Badge></TableCell>
            <TableCell className="px-4 py-2" >{course.courseTitle}</TableCell>
            <TableCell className=" px-4 py-2 text-right">
              <Button size="sm" variant='ghost' onClick={()=>navigate(`${course._id}`)}>
                <Edit/>
              </Button>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
    </div>
  );
};

export default CourseTable;
