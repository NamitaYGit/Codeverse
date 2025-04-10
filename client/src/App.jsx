import "./App.css";
import Login from "./pages/Login";
import Navbar from "../components/Navbar";
import HeroSection from "./pages/student/HeroSection";
import { createBrowserRouter } from "react-router-dom";
import MainLayout from "./layout/MainLayout";
import { RouterProvider } from "react-router";
import Courses from "./pages/student/Courses";
import { GoogleOAuthProvider } from "@react-oauth/google";
const appRouter = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    children: [
      {
        path: "/",
        element: (
          <>
            {" "}
            <HeroSection />
            <Courses />
          </>
        ),
      },
      {
        path: "/login",
        element: <Login />,
      },
    ],
  },
]);
function App() {
  const clientId=import.meta.env.VITE_GOOGLE_CLIENT_ID;
  return (
    <GoogleOAuthProvider clientId={clientId}>
      <main>
        <RouterProvider router={appRouter} />
      </main>
    </GoogleOAuthProvider>
  );
}

export default App;
