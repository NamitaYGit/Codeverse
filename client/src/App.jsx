import "./App.css";
import { useNavigate } from "react-router-dom";
import Login from "./pages/Login";
import Navbar from "../components/Navbar";
import HeroSection from "./pages/student/HeroSection";
import { createBrowserRouter } from "react-router-dom";
import MainLayout from "./layout/MainLayout";
import { RouterProvider } from "react-router-dom";
import Courses from "./pages/student/Courses";
import { GoogleOAuthProvider } from "@react-oauth/google";
import { useEffect } from "react";
import { toast } from "sonner";
import MyLearning from "./pages/student/MyLearning";
import Profile from "./pages/student/Profile";

import Sidebar from "./pages/admin/Sidebar";
import CourseTable from "./pages/admin/course/CourseTable";
import Dashboard from "./pages/admin/Dashboard";
import AddCourse from "./pages/admin/course/AddCourse";
import EditCourse from "./pages/admin/course/EditCourse";
import CreateLecture from "./pages/admin/lecture/CreateLecture";
import EditLecture from "./pages/admin/lecture/EditLecture";
import CourseDetail from "./pages/student/CourseDetail";
import CourseProgress from "./pages/student/CourseProgress";
import { useDispatch } from "react-redux";
import { userLoggedIn } from "./features/authSlice";
import SearchPage from "./pages/student/SearchPage";
import { ThemeProvider } from "../components/ThemeProvider";
import {
  AdminRoute,
  AuthenticatedUser,
  ProtectedRoute,
} from "../components/ProtectedRoutes";
import PurchaseCourseProtectedRoute from "../components/PurchaseCourseProtectedRoute";
const appRouter = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    children: [
      {
        path: "/",
        element: (
          <>
            <HeroSection />
            <Courses />
          </>
        ),
      },
      {
        path: "/login",
         element: (
          <AuthenticatedUser>
            <Login />
          </AuthenticatedUser>
        ),
      },
      {
        path: "/github-callback",
        element: <GitHubCallback />},
       { path: "my-learning",
        element: (
          <ProtectedRoute>
            <MyLearning />
          </ProtectedRoute>
        ),
      },
      {
        path: "profile",
        element: (
          <ProtectedRoute>
            <Profile />
          </ProtectedRoute>
        ),
      },
      {
        path: "course/search",
         element: (
          <ProtectedRoute>
            <SearchPage />
          </ProtectedRoute>
        ),
      },
       {
        path: "course-detail/:courseId",
        element: (
          <ProtectedRoute>
            <CourseDetail />
          </ProtectedRoute>
        ),
      },{
  path: "my-learning/course-detail/:courseId",
  element: (
    <ProtectedRoute>
      <CourseDetail />
    </ProtectedRoute>
  ),
}
,{
  path: "profile/course-detail/:courseId",
  element: (
    <ProtectedRoute>
      <CourseDetail />
    </ProtectedRoute>
  ),
},
,
      {
        path: "course-progress/:courseId",
        element: (
          <ProtectedRoute>
            <PurchaseCourseProtectedRoute>
            <CourseProgress />
            </PurchaseCourseProtectedRoute>
          </ProtectedRoute>
        ),
      },
      //hereon admin routes 
      {
        path: "admin",
          element: (
          <AdminRoute>
            <Sidebar />
          </AdminRoute>
        ),
        children:[
          {
            path:"dashboard",
            element:<Dashboard/>
          },
          {
            path:"course",
            element:<CourseTable/>
          },
          {
            path:"course/create",
            element:<AddCourse/>
          },
          {
            path:"course/:courseId",
            element:<EditCourse/>
          },
          {
            path:"course/:courseId/lecture",
            element:<CreateLecture/>
          },
          {
            path:"course/:courseId/lecture/:lectureId",
            element:<EditLecture/>
          },
        ],
      },
    ],
  },
]);

function GitHubCallback() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  useEffect(() => {
    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
    const code = urlParams.get('code');
    
    if (code) {
      handleGitHubCallback(code);
    }
  }, []);

  const handleGitHubCallback = async (code) => {
    const backendUrl = import.meta.env.VITE_USER_API;


    try {
      const response = await fetch(`${backendUrl}github-login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify({ code }),
      });
      const data = await response.json();
      
      if (response.ok) {
          dispatch(userLoggedIn({ user: data.user }));
        toast.success(data.message || "Giithub login successful");
        navigate("/");
      } else {
        // console.error('GitHub login failed:', data.message);
        toast.error(data.message || "GitHub login failed");
        window.location.href = '/login?error=github_login_failed';
      }
    } catch (error) {
      console.error('Error during GitHub login:', error);
      toast.error("Something went wrong with GitHub login");
      window.location.href = '/login?error=github_login_error';
    }
  };

  return (
    
    <div className="flex items-center justify-center h-screen">
      <div className="text-center">
        <h2 className="text-2xl font-bold mb-2">Processing GitHub Login</h2>
        <p>Please wait while we complete your authentication...</p>
      </div>
    </div>
  );
}

function App() {
  const googleClientId = import.meta.env.VITE_GOOGLE_CLIENT_ID;
  return (
    <GoogleOAuthProvider clientId={googleClientId}>
      <main>
        <ThemeProvider>
          
        <RouterProvider router={appRouter} />
        </ThemeProvider>
      </main>
    </GoogleOAuthProvider>
  );
}

export default App;