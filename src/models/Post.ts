import mongoose from "mongoose";
import { IPost } from "./types/post";

const Schema = mongoose.Schema;

const PostSchma = new Schema<IPost>(
  {
    title: { type: String, required: true },
    content: { type: String, required: true },
    imageUrl: String,
    author: {
      type: String,
      required: true,
    },
    category: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "Category",
    },
    tags: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Tag'
      },
    ],
    deletedAt: {},
  },
  { timestamps: true }
);

const Post = mongoose.model("Post", PostSchma);

export default Post;
