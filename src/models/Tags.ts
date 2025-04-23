import mongoose from "mongoose";
import { ITag } from './types/tags'




const Schema = mongoose.Schema;

const tagSchema = new Schema<ITag>(
  {
    name: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);


const Tag = mongoose.model("Tag", tagSchema)

export default Tag