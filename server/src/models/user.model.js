import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
     
    },
    email: {
        type: String,
        required: true,
      
    },
    password: {
        type: String,
        required: function () {
          return this.provider !== "google";
        },
      },
      provider: {
        type: String,
        enum: ["local", "google"],
        default: "local",
      },      
    role:{
        type: String,
        enum: ['instructor', 'student'],
        default: 'student',
    },
    enrolledCourses: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Course',
        }
    ],
    photoUrl:{
        type: String,
        default: '',
    }

  

   
},{timestamps:true}); 
export const User = mongoose.model('User', userSchema);