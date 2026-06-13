import { Schema, model } from "mongoose";
import { CATEGORIES } from "../constanst/categories.js";

const productShema = new Schema({
  name:{
    type: String,
    required:true,
    trim: true
  },
  price:{
    type: Number,
    required:true,
  },
  category:{
    type: String,
    enum: CATEGORIES,
    default: "other",
  },
  description:{
    type: String,
  }
}, {
  timestamps:true,
  versionKey:false,
});

export const Product = model('Product', productShema);
