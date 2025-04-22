import mongoose from "mongoose";
import { ICategory } from "./types/category";

const Schema = mongoose.Schema;

const categorySchema = new Schema<ICategory>(
  {
    name: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);


const Category = mongoose.model("Comment", categorySchema)

export default Category