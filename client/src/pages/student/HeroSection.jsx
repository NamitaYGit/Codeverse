import { Input } from "../../../components/ui/input";
import { Button } from "../../../components/ui/button";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const HeroSection = () => {
  const [searchQuery,setSearchQuery]=useState("");
  const navigate=useNavigate();
  const searchHandler=(e)=>{
    e.preventDefault();
    if(searchQuery.trim()!== ""){
      navigate(`/course/search?query=${searchQuery}`);
    }
    setSearchQuery("");
    
  }
  return (
    <div className="relative bg-gradient-to-l from-[#5bc0be] to-[#3a506b] dark:from-[#1c2541] dark:to-[#0b132b] py-24 px-4 text-center transition-colors duration-300">
      <div className="max-w-3xl mx-auto ">
        <h1 className="text-white text-3xl font-bold mb-4 mt-4">
          Find the best courses for excelling in what u learn{" "}
        </h1>
        <p className="text-white/80 dark:text-[#5bc0be]/80 mb-8">
          Discover ,Learn and Upskill with our wide range of courses
        </p>
        <form onSubmit={searchHandler} className='flex items-center bg-white dark:bg-[#1c2541] rounded-full shadow-lg overflow-hidden max-w-xl mx-auto mb-6 border border-[#5bc0be]/20 dark:border-[#5bc0be]/30'action="">
            <Input
            type="text"
            value={searchQuery}
            onChange={(e)=>setSearchQuery(e.target.value)}
            placeholder="Search Courses"
            className='flex-grow border-none focus-visible:ring-0 px-6 py-3 text-[#0b132b] dark:text-white placeholder-[#3a506b] dark:placeholder-[#5bc0be]/60 bg-transparent'
            />
            <Button type ="submit" className='bg-gradient-to-r from-[#3a506b] to-[#1c2541] text-white px-6 py-3 rounded-r-full hover:from-[#5bc0be] hover:to-[#3a506b] transition-all duration-300'>Search</Button>
        </form>
        <Button onClick={()=>navigate(`/course/search?query`)} className='bg-white dark:bg-[#1c2541] text-[#3a506b] dark:text-[#5bc0be] rounded-full hover:bg-white/90 dark:hover:bg-[#1c2541]/90 border border-[#5bc0be]/20 dark:border-[#5bc0be]/30 transition-all duration-300'>Explore Courses</Button>
      </div>
    </div>
  );
};

export default HeroSection;