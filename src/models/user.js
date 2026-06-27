import { Schema, model } from "mongoose";

const userSсhema = new Schema({
  name: {
    type: String,
    required:true,
    trim: true,
  },
  email:{
    type: String,
    unique:true,
    required:true,
    match: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
    trim: true,
  },
  password:{
    type: String,
    required:true,
    trim: true,
  }
}, {timestamps: true, versionKey:false});

userSсhema.methods.toJSON = function () {
  const obj = this.toObject();
  delete obj.password;
  return obj;
};

export const User = model("User", userSсhema);
