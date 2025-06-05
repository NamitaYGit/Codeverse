import { Button } from "../../../components/ui/button";
import { ChartNoAxesColumn, SquareLibrary } from "lucide-react";
import React from "react";
import { Link, Outlet } from "react-router-dom";

const Sidebar = () => {
  return (
    <div className="flex">
      <div className="w-[60px] sm:w-[250px] space-y-8 border-r border-gray-300 dark:border-gray-700 bg-[#F0F0F0] dark:bg-[#18303a] p-5 h-screen top-0 sticky">
        <div className="mt-16 space-y-4">
          <Button variant="outline" className="w-10/12">
    <Link to="dashboard" className="flex items-center gap-2 text-gray-800 dark:text-gray-200">
            <ChartNoAxesColumn size={22} />
            <h1 className="hidden sm:block">Dashboard</h1>
          </Link>
          </Button>
          <Button variant="outline" className="w-10/12">
          <Link to="course" className="flex items-center gap-2 text-gray-800 dark:text-gray-200">
            <SquareLibrary size={22} />
            <h1 className="hidden sm:block">Courses</h1>
          </Link>
          </Button>
          
        </div>
      </div>
      <div className="flex-1 md:p-24 p-2 bg-white dark:bg-[#121212] text-black dark:text-white">
        <Outlet />
      </div>
    </div>
  );
};

export default Sidebar;
