import { User } from "../models/user.model.js";
import bcrypt from "bcryptjs";
import { generateToken } from "../utils/generateToken.js";
import axios from "axios";

import { deleteMediaFromCloudinary, uploadMedia } from "../utils/cloudinary.js";

export const register = async (req, res) => {
  try {
    const { name, email, password, role } = req.body;

    if (!name || !email || !password) {
      return res.status(400).json({
        success: false,
        message: "Please provide all required fields",
      });
    }

    const allowedRoles = ["student", "instructor"];
    const userRole = allowedRoles.includes(role) ? role : "student";

    // Check if user already exists
    const user = await User.findOne({ email });
    if (user) {
      return res.status(400).json({
        success: false,
        message: "User already exists with this email",
      });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    await User.create({
      name,
      email,
      password: hashedPassword,
      role: userRole,
    });

    return res.status(201).json({
      success: true,
      message: "Account registered successfully",
    });
  } catch (error) {
    console.error("Error registering user:", error);
    return res.status(500).json({
      success: false,
      message: "Error registering user",
      error: error.message,
    });
  }
};

export const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).json({
        success: false,
        message: "Please provide all required fields",
      });
    }
    // Check if user exists
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({
        success: false,
        message: "Invalid credentials",
      });
    }
    // Check password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({
        success: false,
        message: "Invalid credentials",
      });
    }
    generateToken(res, user, `Welcome back ${user.name}`);
    res.status(200).json({
      success: true,
      message: `Welcome back ${user.name}`,
      user: {
        name: user.name,
        email: user.email,
        role: user.role,
        photoUrl: user.photoUrl,
      },
    });
  } catch (error) {
    console.error("Error logging in user:", error);
    return res.status(500).json({
      success: false,
      message: "Error logging in user",
      error: error.message,
    });
  }
};
export const googleLogin = async (req, res) => {
  const { name, email, photoUrl } = req.body;
  // console.log(email,name,photoUrl);
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

    res.status(200).json({
  success: true,
  message: `Welcome ${user.name} (signed in with google)`,
  user: {
    name: user.name,
    email: user.email,
    role: user.role,
    photoUrl: user.photoUrl,
  }
});

  } catch (error) {
    console.error("Google login error:", error);
    return res.status(500).json({
      success: false,
      message: "Server error during Google login",
      error: error.message,
    });
  }
};

export const githubLogin = async (req, res) => {
  const { code } = req.body;

  if (!code) {
    return res.status(400).json({
      success: false,
      message: "Missing GitHub authorization code",
    });
  }

  try {
    const tokenResponse = await axios.post(
      "https://github.com/login/oauth/access_token",
      {
        client_id: process.env.GITHUB_CLIENT_ID,
        client_secret: process.env.GITHUB_CLIENT_SECRET,
        code,
      },
      {
        headers: {
          Accept: "application/json",
        },
      }
    );

    const accessToken = await tokenResponse.data.access_token;
    // console.log("access token: ",accessToken);
    if (!accessToken) {
      return res.status(400).json({
        success: false,
        message: "Failed to obtain access token from GitHub",
      });
    }
    const userResponse = await axios.get("https://api.github.com/user", {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });

    const githubUser = userResponse.data;
    let userEmail;
    try {
      const emailsResponse = await axios.get(
        "https://api.github.com/user/emails",
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );

      const primaryEmail = emailsResponse.data.find((email) => email.primary);
      userEmail = primaryEmail
        ? primaryEmail.email
        : emailsResponse.data[0].email;
    } catch (error) {
      userEmail = `${githubUser.login}@github.user`;
    }
    let user = await User.findOne({ email: userEmail });

    if (!user) {
      user = await User.create({
        name: githubUser.name || githubUser.login,
        email: userEmail,
        provider: "github",
        photoUrl: githubUser.avatar_url,
      });
    } else {
      if (user.provider !== "github") {
        user.provider = "github";
        user.photoUrl = githubUser.avatar_url || user.photoUrl;
        await user.save();
      }
    }
    res.status(200).json({
  success: true,
  message: `Welcome ${user.name} (signed in with Github)`,
  user: {
    name: user.name,
    email: user.email,
    role: user.role,
    photoUrl: user.photoUrl,
  }
});

  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Server error during GitHub login",
      error: error.message,
    });
  }
};

export const logout = async (req, res) => {
  try {
    return res.status(200).cookie("token", "", { maxAge: 0 }).json({
      message: "Logged out Successfully!",
      success: true,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      message: "Failed to Logout",
    });
  }
};
export const githubCallback = async (req, res) => {
  const { code } = req.query;
  if (!code) {
    return res.redirect("/login?error=no_code");
  }
  res.redirect(`/github-callback?code=${code}`);
};

export const getUserProfile = async (req, res) => {
  try {
    const userId = req.id;
    const user = await User.findById(userId)
      .select("-password")
      .populate("enrolledCourses");
    if (!user) {
      return res.status(404).json({
        message: "Profile not found",
        success: false,
      });
    }

    return res.status(200).json({
      success: true,
      user,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      message: "Failed to load User",
    });
  }
};

export const updateProfile = async (req, res) => {
  try {
    const userId = req.id;
    const { name, role } = req.body;
    const profilePhoto = req.file;

    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({
        message: "User not found",
        success: false,
      });
    }

    const updatedData = { name };

    // Handle role safely
    if (role && ["student", "instructor"].includes(role)) {
      updatedData.role = role;
    }

    // Handle image
    if (profilePhoto) {
      if (user.photoUrl) {
        const publicId = user.photoUrl.split("/").pop().split(".")[0];
        await deleteMediaFromCloudinary(publicId);
      }
      const cloudResponse = await uploadMedia(profilePhoto.path);
      updatedData.photoUrl = cloudResponse.secure_url;
    }

    const updatedUser = await User.findByIdAndUpdate(userId, updatedData, {
      new: true,
    }).select("-password");

    return res.status(200).json({
      success: true,
      message: "Profile updated successfully",
      user: updatedUser,
    });
  } catch (error) {
    console.error("Update profile error:", error);
    return res.status(500).json({
      success: false,
      message: "Failed to update profile",
      error: error.message,
    });
  }
};
