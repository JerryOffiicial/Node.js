import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
  user_name: {
    type: mongoose.Schema.Types.String,
    required: true,
    unique: true,//any two things can't be same
  },

  password: {
    type: mongoose.Schema.Types.String,
    // required: true,//no need for google loggers
  },

  googleId:{
    type: mongoose.Schema.Types.String,
    unique: true,//any two things can't be same
    sparse: true,//ignore the null
  },
  email:{
    type: mongoose.Schema.Types.String,
    unique: true,//any two things can't be same
    sparse: true,//ignore the null
  }


});

export const User = mongoose.model("User", UserSchema);
