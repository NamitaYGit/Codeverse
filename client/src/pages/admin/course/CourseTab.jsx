import { Label } from "@radix-ui/react-dropdown-menu";
import { Button } from "../../../../components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../../../../components/ui/card";
import React, { useState } from "react";
import { Input } from "../../../../components/ui/input";
import RichTextEditor from "../../../../components/RichTextEditor";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "../../../../components/ui/select";
import { Loader2 } from "lucide-react";
import { useNavigate } from "react-router-dom";

const CourseTab = () => {
  const [input, setInput] = useState({
    courseTitle: "",
    subTitle: "",
    description: "",
    category: "",
    courseLevel: "",
    coursePrice: "",
    courseThumbnnail: "",
  });
  const changeEventHandler = (e) => {
    const { name, value } = e.target;
    setInput({ ...input, [name]: value });
  };
  const isPublished = true;
  const isLoading = false;
  const selectCategory=(value)=>{
    setInput({ ...input, category: value });
  }
  const selectCourseLevel=(value)=>{
    setInput({ ...input, courseLevel: value });
  }
  const selectThumbnail=(e)=>{
    const file=e.target.files?.[0];
    if(file) {
      setInput({ ...input,courseThumbnnail: file });
    }
  }
  const navigate=useNavigate();
  return (
    <>
      <Card>
        <CardHeader className="flex flex-row justify-between">
          <div>
            <CardTitle>Basic Course Description</CardTitle>
            <CardDescription>
              Make changes to your course.Click save when you're done.
            </CardDescription>
          </div>
          <div className="space-x-2">
            <Button variant="outline">
              {isPublished ? "Unpublish" : "Publish"}
            </Button>
            <Button>Remove Course</Button>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-4 mt-5">
            <div>
              <Label>Title</Label>
              <Input
                type="text"
                name="courseTitle"
                value={input.courseTitle}
                onChange={changeEventHandler}
                placeholder="Eg: Fullstack developer"
              />
            </div>
            <div>
              <Label>Subtitle</Label>
              <Input
                type="text"
                name="subTitle"
                value={input.subTitle}
                onChange={changeEventHandler}
                placeholder="Eg: Become a fullstack developer in one month"
              />
            </div>
            <div>
              <Label>Description</Label>
              <RichTextEditor input={input} setInput={setInput} />
            </div>
            <div className="flex items-center gap-5">
              <div>
                <Label>Category</Label>
                <Select onValueChange={selectCategory}>
                  <SelectTrigger className="w-[180px]">
                    <SelectValue placeholder="Select a category" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectGroup>
                      <SelectLabel>Category</SelectLabel>
                      <SelectItem value="Next.js">Next.js</SelectItem>
                      <SelectItem value="Data Science">Data Science</SelectItem>
                      <SelectItem value="Fullstack Development">
                        Fullstack Development
                      </SelectItem>
                      <SelectItem value="MERN Stack Development">
                        MERN Stack Development
                      </SelectItem>
                      <SelectItem value="Python">Python</SelectItem>
                      <SelectItem value="Docker">Docker</SelectItem>
                      <SelectItem value="HTML">HTML</SelectItem>
                      <SelectItem value="Javascript">Javascript</SelectItem>
                      <SelectItem value="MongoDB">MongoDB</SelectItem>
                    </SelectGroup>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label>Course Level</Label>
                <Select onValueChange={selectCourseLevel}>
                  <SelectTrigger className="w-[180px]">
                    <SelectValue placeholder="Select a course level" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectGroup>
                      <SelectLabel>Course Level</SelectLabel>
                      <SelectItem value="Beginner">Beginner</SelectItem>
                      <SelectItem value="Medium">Medium</SelectItem>
                      <SelectItem value="Advance">Advance</SelectItem>
                    </SelectGroup>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label>Price in (INR)</Label>
                <Input
                  type="number"
                  name="coursePrice"
                  value={input.coursePrice}
                  onChange={changeEventHandler}
                  placeholder="199"
                  className="w-fit"
                />
              </div>
            </div>
            <div>
              <Label>Course Thumbnail</Label>
              <Input type="file" accept="image/*" className="w-fit" />
            </div>
            <div className="flex flex-row gap-2">
            <Button onClick={()=>navigate("/admin/course")} variant="outline">Cancel</Button>
            <Button disabled={isLoading}>
              {isLoading ? (
                <>
                  <Loader2 className="mr-2 h-4 animate-spin" />
                  Please wait
                </>
              ) : (
                "Save"
              )}
            </Button>
            </div>
            
          </div>
        </CardContent>
      </Card>
    </>
  );
};

export default CourseTab;
