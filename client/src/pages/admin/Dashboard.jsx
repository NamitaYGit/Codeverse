import { Card, CardHeader, CardTitle } from "../../../components/ui/card";
import React from "react";

const Dashboard = () => {
  return (
    <div className="min-h-screen bg-[#ffffff] dark:bg-[#0B132B] transition-colors duration-300">
      <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 p-6">
        {/* Card #1: Teal → Steel gradient */}
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
            <CardTitle className="text-xl font-semibold">Total Sales</CardTitle>
            <div className="text-3xl font-bold mt-2">$24,580</div>
            <div className="text-sm opacity-90">+12% from last month</div>
          </CardHeader>
        </Card>

        {/* Card #2: Steel → Midnight gradient */}
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
            <CardTitle className="text-xl font-semibold">Active Courses</CardTitle>
            <div className="text-3xl font-bold mt-2">156</div>
            <div className="text-sm opacity-90">+8 new this week</div>
          </CardHeader>
        </Card>

        {/* Card #3: Light card with subtle teal border, switching to midnight in dark mode */}
        <Card className="
          bg-[#ffffff] dark:bg-[#1C2541]
          border
            border-[#5BC0BE]/20
            dark:border-[#5BC0BE]/30
          shadow-lg
          hover:shadow-xl
          transition-all
          duration-300
          hover:scale-105
        ">
          <CardHeader>
            <CardTitle className="text-xl font-semibold text-[#1C2541] dark:text-[#5BC0BE]">
              Students Enrolled
            </CardTitle>
            <div className="text-3xl font-bold mt-2 text-[#0B132B] dark:text-[#ffffff]">
              2,847
            </div>
            <div className="text-sm text-[#3A506B] dark:text-[#5BC0BE]/80">
              +156 this month
            </div>
          </CardHeader>
        </Card>
      </div>
    </div>
  );
};

export default Dashboard;
