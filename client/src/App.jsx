import "./App.css";
import Login from "./pages/Login";

import HeroSection from "./pages/student/HeroSection";
import { createBrowserRouter } from "react-router-dom";
import MainLayout from "./layout/MainLayout";
import { RouterProvider } from "react-router";
import Courses from "./pages/student/Courses";
import { GoogleOAuthProvider } from "@react-oauth/google";
import { useEffect } from "react";
import { toast } from "sonner";
import MyLearning from "./pages/student/MyLearning";
import Profile from "./pages/student/Profile";
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
        element: <Login />,
      },
      {
        path: "/github-callback",
        element: <GitHubCallback />},
       { path: "my-learning",
        element: <MyLearning/>,
      },
      {
        path: "profile",
        element: <Profile/>,
      },
    ],
  },
]);

function GitHubCallback() {
  useEffect(() => {
    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
    const code = urlParams.get('code');
    
    if (code) {
      handleGitHubCallback(code);
    }
  }, []);

  const handleGitHubCallback = async (code) => {
    try {
      const response = await fetch('http://localhost:8000/api/v1/user/github-login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify({ code }),
      });
      const data = await response.json();
      
      if (response.ok) {
        toast.success(data.message || "Giithub login successful");
        // window.location.href = '/';
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
        <RouterProvider router={appRouter} />
      </main>
    </GoogleOAuthProvider>
  );
}

export default App;