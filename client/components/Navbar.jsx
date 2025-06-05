import { Menu, Squirrel } from "lucide-react";
import React, { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuPortal,
  DropdownMenuSeparator,
  DropdownMenuSub,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import { Button } from "./ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import DarkMode from "../DarkMode";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "./ui/sheet";
import { Label } from "./ui/label";
import { Input } from "./ui/input";
import { Separator } from "@radix-ui/react-dropdown-menu";
import { useLogoutUserMutation } from "../src/features/api/authApi";
import { toast } from "sonner";
import { useSelector } from "react-redux";

const Navbar = () => {
  const { user } = useSelector((store) => store.auth);
  const [logoutUser, { data, isSuccess }] = useLogoutUserMutation();
  const navigate = useNavigate();
  useEffect(() => {
    if (isSuccess) {
      toast.success(data?.message || "Logout Successfully");
      navigate("/login");
    }
  }, [isSuccess]);
  const logoutHandler = async () => {
    await logoutUser();
  };
  console.log(user);

  return (
    <div className="h-16 bg-[#ffffff] dark:bg-[#0B132B] border-b border-[#5BC0BE]/20 dark:border-[#5BC0BE]/30 fixed top-0 left-0 right-0 duration-300 z-10 shadow-lg">
      {/*Desktop*/}
      <div className="max-w-7xl mx-auto hidden md:flex justify-between items-center gap-10 h-full">
        <div className="flex items-center gap-2">
          <Squirrel size={"45"} />
          <Link to="/" ><h1 className="hidden md:block font-extrabold text-2xl">CodeVerse</h1></Link>
        </div>
        {/*User Icon and Dark Mode Icon */}
        <div className="flex items-center gap-8">
          {user ? (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="p-0 h-auto rounded-full hover:ring-2 hover:ring-[#5BC0BE]/30 transition-all duration-300">
                  <Avatar className="ring-2 ring-[#5BC0BE]/20">
                    <AvatarImage
                      src={user?.photoUrl || "https://github.com/shadcn.png"}
                      alt="@shadcn"
                    />
                    <AvatarFallback className="bg-gradient-to-br from-[#5BC0BE] to-[#3A506B] text-white">CN</AvatarFallback>
                  </Avatar>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-56 bg-[#ffffff] dark:bg-[#1C2541] border border-[#5BC0BE]/20 dark:border-[#5BC0BE]/30">
                <DropdownMenuLabel className="text-[#1C2541] dark:text-[#5BC0BE]">My Account</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuGroup>
                  <DropdownMenuItem className="hover:bg-[#5BC0BE]/10 focus:bg-[#5BC0BE]/10">
                    <Link to="my-learning" className="text-[#0B132B] dark:text-[#ffffff]">My Learning</Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem className="hover:bg-[#5BC0BE]/10 focus:bg-[#5BC0BE]/10">
                    <Link to="profile" className="text-[#0B132B] dark:text-[#ffffff]">Edit Profile</Link>
                  </DropdownMenuItem>

                  <DropdownMenuSeparator />
                  <DropdownMenuItem 
                    onClick={logoutHandler}
                    className="hover:bg-red-50 focus:bg-red-50 dark:hover:bg-red-900/20 dark:focus:bg-red-900/20 text-red-600 dark:text-red-400"
                  >
                    Log out
                  </DropdownMenuItem>
                </DropdownMenuGroup>
                {user?.role === "instructor" && (
                  <>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem><Link to="/admin/dashboard">Dashboard</Link></DropdownMenuItem>
                  </>
                )}
              </DropdownMenuContent>
            </DropdownMenu>
          ) : (
            <div className="flex items-center gap-2">
              <Button 
                variant="outline" 
                onClick={() => navigate("/login")}
                className="border-[#5BC0BE]/30 text-[#3A506B] dark:text-[#5BC0BE] hover:bg-[#5BC0BE]/10 hover:border-[#5BC0BE] transition-all duration-300"
              >
                Login
              </Button>
              <Button 
                onClick={() => navigate("/login")}
                className="bg-gradient-to-r from-[#5BC0BE] to-[#3A506B] hover:from-[#3A506B] hover:to-[#1C2541] text-white border-0 transition-all duration-300 hover:shadow-lg"
              >
                Signup
              </Button>
            </div>
          )}
          <DarkMode />
        </div>
      </div>
      {/*Mobile */}
      <div className="flex md:hidden items-center justify-between px-4 h-full">
        <h1 className="font-extrabold text-2xl bg-gradient-to-r from-[#5BC0BE] to-[#3A506B] bg-clip-text text-transparent">
          CodeVerse
        </h1>
        <MobileNavbar />
      </div>
    </div>
  );
};

export default Navbar;

const MobileNavbar = () => {
  const role = "instructor";
  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button
          size="icon"
          className="rounded-full bg-gradient-to-r from-[#5BC0BE] to-[#3A506B] hover:from-[#3A506B] hover:to-[#1C2541] text-white border-0 transition-all duration-300"
          variant="outline"
        >
          <Menu />
        </Button>
      </SheetTrigger>
      <SheetContent className="flex flex-col px-4 py-4 space-y-2 bg-[#ffffff] dark:bg-[#0B132B] border-l border-[#5BC0BE]/20 dark:border-[#5BC0BE]/30">
        {/* Header */}
        <SheetHeader className="flex flex-row items-center justify-between">
          <SheetTitle className="text-xl font-semibold bg-gradient-to-r from-[#5BC0BE] to-[#3A506B] bg-clip-text text-transparent">
            CodeVerse
          </SheetTitle>
          <DarkMode />
        </SheetHeader>

        <Separator />

        {/* Navigation */}
        <nav className="flex flex-col space-y-2">
          <Button 
            variant="ghost" 
            className="justify-start hover:bg-[#5BC0BE]/10 text-[#0B132B] dark:text-[#ffffff] hover:text-[#3A506B] dark:hover:text-[#5BC0BE] transition-all duration-300"
          >
            My Learning
          </Button>
          <Button 
            variant="ghost" 
            className="justify-start hover:bg-[#5BC0BE]/10 text-[#0B132B] dark:text-[#ffffff] hover:text-[#3A506B] dark:hover:text-[#5BC0BE] transition-all duration-300"
          >
            Edit Profile
          </Button>
          <Button 
            variant="ghost" 
            className="justify-start hover:bg-red-50 dark:hover:bg-red-900/20 text-red-600 dark:text-red-400 transition-all duration-300"
          >
            Log out
          </Button>
        </nav>

        {/* Dashboard (only for instructor) */}
        {role === "instructor" && (
          <>
            <Separator />
            <SheetClose asChild>
              <Button className="w-full mt-2 bg-gradient-to-r from-[#5BC0BE] to-[#3A506B] hover:from-[#3A506B] hover:to-[#1C2541] text-white border-0 transition-all duration-300 hover:shadow-lg">
                Dashboard
              </Button>
            </SheetClose>
          </>
        )}
      </SheetContent>
    </Sheet>
  );
};