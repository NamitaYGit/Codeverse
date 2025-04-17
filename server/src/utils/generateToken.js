import jwt from 'jsonwebtoken';

export const generateToken = (res, user, message) => {
    const token = jwt.sign({userId: user._id}, process.env.SECRET_KEY, { expiresIn: '1d' });
    
    res.status(200)
      .cookie("token", token, { 
        httpOnly: true,
        secure: process.env.NODE_ENV !== 'development',
        sameSite: 'Lax',
        maxAge: 24 * 60 * 60 * 1000 
      })
      .json({
        success: true,
        message: message,
        user: {
          _id: user._id,
          name: user.name,
          email: user.email,
          photoUrl: user.photoUrl
        }
      });
  };