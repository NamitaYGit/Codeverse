import { Button } from "../../../client/components/ui/button";
import { Input } from "../../../client/components/ui/input";
import { Label } from "../../../client/components/ui/label";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../../../client/components/ui/card";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "../../../client/components/ui/tabs";
import { useEffect, useState } from "react";
import { useLoginUserMutation, useRegisterUserMutation } from "../features/api/authApi";
import { Loader2 } from "lucide-react";
import { toast } from "sonner";
import { GoogleLogin } from "@react-oauth/google";
import { jwtDecode }from "jwt-decode";
const Login = () => {
  const [signupInput, setSignupInput] = useState({
    name: "",
    email: "",
    password: "",
  });
  const [loginInput, setLoginInput] = useState({ email: "", password: "" });
  const [registerUser, { data: registerData, error: registerError, isLoading: registerIsLoading, isSuccess: registerIsSuccess }] = useRegisterUserMutation();
  const [loginUser, { data: loginData, error: loginError, isLoading: loginIsLoading, isSuccess: loginIsSuccess }] = useLoginUserMutation();
  const changeInputHandler = (e, type) => {
    const { name, value } = e.target;
    if (type === "signup") {
      setSignupInput({ ...signupInput, [name]: value });
    } else {
      setLoginInput({ ...loginInput, [name]: value });
    }
  };

  const handleRegistration = async (type) => {
    const inputData = type === "signup" ? signupInput : loginInput;
    const action = type === "signup" ? registerUser : loginUser;
    const { name, email, password } = inputData;
    await action(inputData)
    
      // try {
      //   const res = await action(inputData).unwrap();
      //   console.log("✅ Server Response:", res);
    
      //   // You can now do stuff like:
      //   // navigate("/home") or setUser(res.user)
    
      // } catch (err) {
      //   console.error("❌ Error during auth:", err);
      //   // Optional: show toast or set error state here
      // }
    };
    
    const onLoginSuccess = async (res) => {
      const decoded = jwtDecode(res.credential);
      // console.log("Google Decoded Data:", decoded);
    
      try {
        const response = await fetch("http://localhost:8000/api/v1/user/google-login", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          credentials: "include", 
          body: JSON.stringify({
            name: decoded.name,
            email: decoded.email,
            photoUrl: decoded.picture,
          }),
        });
        
    
        const data = await response.json();
    
        if (response.ok) {
          toast.success(data.message || "Google login successful");
        } else {
          toast.error(data.message || "Google login failed");
        }
      } catch (error) {
        console.error("Google login error:", error);
        toast.error("Something went wrong with Google login");
      }
    };
    
    const onLoginError = () => {
      console.log('Login Failed ',res);
    };
    // console.log(inputData);
    useEffect(()=>{
      if(registerIsSuccess && registerData){
        toast.success(registerData.message || "Signup successful.")
      }
      if(loginIsSuccess && loginData){
        toast.success(loginData.message || "Login successful.")
      }
      if (registerError) {
        toast.error(registerError?.data?.message || "Signup failed.")
      }
      
      if (loginError) {
        toast.error(loginError?.data?.message || "Login failed.")
      }
      
    },[
      loginIsLoading,
      registerIsLoading,
      loginData,
      registerData,
      loginError,
      registerError
    ]);
  
  return (
<div className="flex items-center justify-center w-full mt-20">
  <Tabs defaultValue="account" className="w-[400px]">
    <TabsList className="grid w-full grid-cols-2">
      <TabsTrigger value="signup">Signup</TabsTrigger>
      <TabsTrigger value="login">Login</TabsTrigger>
    </TabsList>

    {/* Signup Tab */}
    <TabsContent value="signup">
      <Card>
        <CardHeader>
          <CardTitle>Signup</CardTitle>
          <CardDescription>Create a new account.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-2">
          <div className="space-y-1">
            <Label htmlFor="name">Name</Label>
            <Input
              name="name"
              value={signupInput.name}
              onChange={(e) => changeInputHandler(e, "signup")}
              type="text"
              placeholder="Eg. Charlie"
              required
            />
          </div>
          <div className="space-y-1">
            <Label htmlFor="email">Email</Label>
            <Input
              name="email"
              value={signupInput.email}
              type="email"
              onChange={(e) => changeInputHandler(e, "signup")}
              placeholder="Eg. abc@gmail.com"
              required
            />
          </div>
          <div className="space-y-1">
            <Label htmlFor="password">Password</Label>
            <Input
              name="password"
              value={signupInput.password}
              onChange={(e) => changeInputHandler(e, "signup")}
              type="password"
              placeholder="Eg. abc"
              required
            />
          </div>
        </CardContent>
        <CardFooter>
          <Button disabled={registerIsLoading} onClick={() => handleRegistration("signup")}>
            {registerIsLoading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" /> Please Wait
              </>
            ) : (
              "Signup"
            )}
          </Button>
        </CardFooter>
      </Card>
    </TabsContent>

    {/* Login Tab */}
    <TabsContent value="login">
      <Card>
        <CardHeader>
          <CardTitle>Login</CardTitle>
          <CardDescription>Login to an existing account.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-2">
          <div className="space-y-1">
            <Label htmlFor="email">Email</Label>
            <Input
              name="email"
              value={loginInput.email}
              onChange={(e) => changeInputHandler(e, "login")}
              type="email"
              placeholder="Eg. abc@gmail.com"
              required
            />
          </div>
          <div className="space-y-1">
            <Label htmlFor="password">Password</Label>
            <Input
              name="password"
              value={loginInput.password}
              onChange={(e) => changeInputHandler(e, "login")}
              type="password"
              placeholder="Eg. abc"
              required
            />
          </div>
        </CardContent>
        <CardFooter>
          <Button disabled={loginIsLoading} onClick={() => handleRegistration("login")}>
            {loginIsLoading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" /> Please Wait
              </>
            ) : (
              "Login"
            )}
          </Button>
        </CardFooter>
      </Card>
    </TabsContent>

    {/* Google Login - shared between both tabs */}
    <div className="mt-6 flex flex-col items-center">
      <div className="text-center text-sm text-gray-500 mb-2">Or continue with</div>
      <GoogleLogin onSuccess={onLoginSuccess} onError={onLoginError} />
    </div>
  </Tabs>
</div>

  );
};

export default Login;
