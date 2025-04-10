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
export const googleLogin = async (req, res) => {
    const { name, email, photoUrl } = req.body;
    console.log(email,name,photoUrl);
    if (!email || !name) {
      return res.status(400).json({
        success: false,
        message: "Missing Google account data",
      });
    }
  
    try {
      let user = await User.findOne({ email });
  
      if (!user) {
        user = await User.create({
          name,
          email,
          provider: "google",
          photoUrl,
        });
      }
  
      generateToken(res, user, `Welcome ${user.name} (signed in with google)`);
  
    } catch (error) {
      console.error("Google login error:", error);
      return res.status(500).json({
        success: false,
        message: "Server error during Google login",
        error: error.message,
      });
    }
  };
  