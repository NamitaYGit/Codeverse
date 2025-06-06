import { useGetPurchasedCoursesQuery } from "../../features/api/purchaseApi";
import { Card, CardContent, CardHeader, CardTitle } from "../../../components/ui/card";
import React from "react";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";
import { useSelector } from "react-redux";

const Dashboard = () => {
  const user = useSelector((state) => state.auth.user);
const adminId = user?._id;

  const {data, isSuccess, isError, isLoading} = useGetPurchasedCoursesQuery();
//console.log("Dashboard data:", data);
  if(isLoading) return <h1>Loading...</h1>
  if(isError) return <h1 className="text-red-500">Failed to get purchased courses</h1>

  //
  const {purchasedCourse=[]} = data || {};

  const adminCourses = purchasedCourse.filter(
    (item) => item?.courseId?.creator === adminId
  );

  const courseData = adminCourses.map((course)=> ({
    name:course.courseId.courseTitle,
    price:course.courseId.coursePrice
  }))

  const totalRevenue = adminCourses.reduce((acc,element) => acc+(element.amount || 0), 0);

  const totalSales = adminCourses.length;
  return (
    <div className=" min-h-screen bg-[#ffffff] dark:bg-[#151515] transition-colors duration-300">
      <div className=" mt-10 grid gap-6 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 p-6">
        <Card className="
          bg-gradient-to-br
            from-[#5BC0BE]
            to-[#3A506B]
          text-[#ffffff]
          border-0
          shadow-lg
          hover:shadow-xl
          transition-all
          duration-300
          hover:scale-105
        ">
          <CardHeader>
            <CardTitle className="text-xl font-semibold">Total Sales :</CardTitle>
            <div className="text-3xl font-bold mt-2">{totalSales}</div>
          </CardHeader>
        </Card>
        <Card className="
          bg-gradient-to-br
            from-[#3A506B]
            to-[#1C2541]
          text-[#ffffff]
          border-0
          shadow-lg
          hover:shadow-xl
          transition-all
          duration-300
          hover:scale-105
        ">
          <CardHeader>
            <CardTitle className="text-xl font-semibold">Total Revenue :</CardTitle>
            <div className="text-3xl font-bold mt-2">{totalRevenue}</div>
          </CardHeader>
        </Card>

        <Card className="shadow-lg hover:shadow-xl transition-shadow duration-300 col-span-1 sm:col-span-2 md:col-span-3 lg:col-span-4">
        <CardHeader>
          <CardTitle className="text-xl font-semibold text-gray-700">
            Course Prices
          </CardTitle>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={250}>
            <LineChart data={courseData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#e0e0e0" />
              <XAxis
                dataKey="name"
                stroke="#6b7280"
                angle={-30}
                textAnchor="end"
                interval={0} 
              />
              <YAxis stroke="#6b7280" />
              <Tooltip formatter={(value, name) => [`₹${value}`, name]} />
              <Line
                type="monotone"
                dataKey="price"
                stroke="#4a90e2"
                strokeWidth={3}
                dot={{ stroke: "#4a90e2", strokeWidth: 2 }} 
              />
            </LineChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>
      </div>
    </div>
  );
};

export default Dashboard;
