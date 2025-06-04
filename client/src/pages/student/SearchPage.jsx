
import React from "react";
import SearchResult from "./SearchResult";
import { AlertCircle } from "lucide-react";
import { Link } from "react-router-dom";
import { Skeleton } from "../../../components/ui/skeleton";
import Filter from "./Filter";
import { Button } from "../../../components/ui/button";

const SearchPage = () => {
  const isLoading = false;
  const isEmpty = false;
  return (
    <div className="max-w-7xl mx-auto p-4 md:p-10 mt-0.5">
      <div className="my-6">
        <h1>result for "html"</h1>
        <p>
          Showing results for{" "}
          <span className="text-blue-800 font-bold italic">Front ene</span>
        </p>
        <div className="flex flex-col md:flex-row gap-10">
          <Filter/>
          <div className="flex-1">
            {isLoading ? (
              Array.from({ length: 3 }).map((_, idx) => (
                <CourseSkeleton key={idx} />
              ))
            ) : isEmpty ? (
              <CourseNotFound />
            ) : (
              [1, 2, 3].map((course, idx) => <SearchResult key={idx} />)
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SearchPage;

const CourseSkeleton = () => {
  return (
    <div className="flex-1 flex flex-col md:flex-row justify-between ">
      <div className="h-32 w-full md:w-64">
        <Skeleton className="h-full w-full object-cover" />
      </div>
      <div className="flex flex-col gap-2 flex-1 px-4">
        <Skeleton className="h-6 w-3/4" />
        <Skeleton className="h-4 w-1/2" />
        <div className="flex items-center gap-2">
          <Skeleton className="h-4 w-1/3" />
        </div>
        <Skeleton className="h-6 w-20 mt-2" />
      </div>
      <div className="flex flex-col items-end justify-between mt-4">
          <Skeleton className="h-6 w-12"/>
      </div>
    </div>
  );
};

const CourseNotFound = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-2">
      <AlertCircle className="text-red-500 h-16 w-16 mb-4" />
      <h1 className="font-bold text-2xl md:text-4xl text-gray-800">
        Course not found
      </h1>
      <p className="text-lg text-gray-600 dark:text-gray-400 mb-3">
        Sorry, we couldn't find the requested course.
      </p>
      <Link to="/" className="italic">
        <Button variant="link">Browse all courses</Button>
      </Link>
    </div>
  );
};
