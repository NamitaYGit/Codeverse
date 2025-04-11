import {User} from '../models/user.model.js';
import bcrypt from 'bcryptjs';
import { generateToken } from '../utils/generateToken.js';
export const  register=async (req, res) => {
   
    try {
        const { name, email, password } = req.body;
        
        if(!name || !email || !password) {
            return res.status(400).json({
                success: false,
                message: 'Please provide all required fields',
            });
        }
        // Check if user already exists
        const user=await User.findOne({ email });
        if (user) {
           
            return res.status(400).json({
                success: false,
                message: 'User already exists with this email',
            });
        }
        const hashedPassword = await bcrypt.hash(password, 10);
          await User.create({ name, email, password:hashedPassword });
        

      return  res.status(201).json({
            success: true,
            message: 'Account registered successfully',
            
        });
    } catch (error) {
        console.error('Error registering user:', error);
      return  res.status(500).json({
            success: false,
            message: 'Error registering user',
            error: error.message,
        });
    }
}

export const login=async (req, res) => {
    try {
        const { email, password } = req.body;
        if(!email || !password) {
            return res.status(400).json({
                success: false,
                message: 'Please provide all required fields',
            });
        }
        // Check if user exists
        const user=await User.findOne({ email });
        if (!user) {
            return res.status(400).json({
                success: false,
                message: 'Invalid credentials',
            });
        }
        // Check password
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({
                success: false,
                message: 'Invalid credentials',
            });
        }
         generateToken(res,user,`Welcome back ${user.name}`);

        //res.status(200).json({
         //   success: true,
          //  message: 'Login successful',
           // user,
     //   });
    } catch (error) {
        console.error('Error logging in user:', error);
      return  res.status(500).json({
            success: false,
            message: 'Error logging in user',
            error: error.message,
        });
    }
}

export const logout=async (_,req)=>
{
    try{
  return res.status(200).cookie("token","",{maxAge:0}).json({
    message:"Logged out Successfully!",
    success:true
  });
    } catch(error)
    {
        console.log(error);
        return res.status(500).json({
            success:false,
            message:"Failed to Logout"
        })
    }
}

export const getUserProfile=async (req,res)=>
{
    try{
       const userId=req.id;
       const user=await User.findById(userId).select("-password");
       if(!user)
       {
        return res.status(404).json({
            message:"Profile not found",
            success:false
        })
       }
       
       
       return res.status(200).json({
        success:true,
        user
       })
    }catch(error)
    {
        console.log(error);
        return res.status(500).json({
            success:false,
            message:"Failed to load User"
        })
    }
}

export const updateProfile=async (req,res)=>
{
    try{
        const userId =req.id;
        const  {name}=req.body;
        const profilePhoto=req.file;
        const user =await User.findById(userId);
        if(!user)
            {
                return res.status(404).json({
                    message:"User not found",
                    success:false
                })
               }

               //extract public id of the old image from the url if it exists
               if(user.photoUrl)
               {
                const publicid=user.photoUrl.split("/").pop().split(".")[0];//extract public id               }
               const updatedData={name,photoUrl}
    }catch(error)
    {
        console.log(error);
        return res.status(500).json({
            success:false,
            message:"Failed to update profile"
        })
    }
}