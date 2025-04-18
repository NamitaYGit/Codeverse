import { Menu, School } from "lucide-react";
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
import { Sheet, SheetClose, SheetContent, SheetDescription, SheetFooter, SheetHeader, SheetTitle, SheetTrigger } from "./ui/sheet";
import { Label } from "./ui/label";
import { Input } from "./ui/input";
import { Separator } from "@radix-ui/react-dropdown-menu";
import { useLogoutUserMutation } from "../src/features/api/authApi";
import { toast } from "sonner";
import { useSelector } from "react-redux";

const Navbar = () => {
  const { user } = useSelector(store => store.auth);
  const [logoutUser, { data, isSuccess }] = useLogoutUserMutation();
  const navigate = useNavigate();
  useEffect(() => {
    if (isSuccess) {
      toast.success(data?.message || "Logout Successfully");
      navigate("/login");
    }
  }, [isSuccess])
  const logoutHandler = async () => {
    await logoutUser();
  }
  console.log(user);

  return (
    <div className="h-16 dark:bg-[#0A0A0A] bg-white border-b dark:border-b-gray-800 border-b-gray-200 fixed top-0 left-0 right-0 duration-300 z-10">
      {/*Desktop*/}
      <div className="max-w-7xl mx-auto hidden md:flex justify-between items-center gap-10 h-full">
        <div className="flex items-center gap-2">
          <School size={"30"} />
          <h1 className="hidden md:block font-extrabold text-2xl">CodeVerse</h1>
        </div>
        {/*User Icon and Dark Mode Icon */}
        <div className="flex items-center gap-8">
          {user ? (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Avatar>
                  <AvatarImage
                    src={user?.photoUrl || "https://github.com/shadcn.png"}
                    alt="@shadcn"
                  />
                  <AvatarFallback>CN</AvatarFallback>
                </Avatar>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-56">
                <DropdownMenuLabel>My Account</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuGroup>
                  <DropdownMenuItem><Link to="my-learning">My Learning</Link></DropdownMenuItem>
                  <DropdownMenuItem><Link to="profile">Edit Profile</Link></DropdownMenuItem>

                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={logoutHandler}>Log out</DropdownMenuItem></DropdownMenuGroup>
                {
                  user?.role === "instructor" && (
                    <> <DropdownMenuSeparator />
                      <DropdownMenuItem>Dashboard</DropdownMenuItem>

                    </>
                  )

                }
              </DropdownMenuContent>
            </DropdownMenu>
          ) : (
            <div className="flex items-center gap-2">
              <Button variant="outline" onClick={() => navigate("/login")}>Login</Button>
              <Button onClick={() => navigate("/login")}>Signup</Button>
            </div>
          )}
          <DarkMode />
        </div>
      </div>
      {/*Mobile */}
      <div className="flex md:hidden items-center justify-between px-4 h-full">
        <h1 className="font-extrabold text-2xl">CodeVerse</h1>
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
          className="rounded-full bg-gray-400 hover:bg-gray-500"
          variant="outline"
        >
          <Menu />
        </Button>
      </SheetTrigger>
      <SheetContent className="flex flex-col px-4 py-4 space-y-2">
        {/* Header */}
        <SheetHeader className="flex flex-row items-center justify-between">
          <SheetTitle className="text-xl font-semibold">CodeVerse</SheetTitle>
          <DarkMode />
        </SheetHeader>

        <Separator />

        {/* Navigation */}
        <nav className="flex flex-col space-y-2">
          <Button variant="ghost" className="justify-start">
            My Learning
          </Button>
          <Button variant="ghost" className="justify-start">
            Edit Profile
          </Button>
          <Button variant="ghost" className="justify-start">
            Log out
          </Button>
        </nav>

        {/* Dashboard (only for instructor) */}
        {role === "instructor" && (
          <>
            <Separator />
            <SheetClose asChild>
              <Button className="w-full mt-2">Dashboard</Button>
            </SheetClose>
          </>
        )}
      </SheetContent>
    </Sheet>
  );
};
