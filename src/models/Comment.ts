import mongoose from "mongoose";
import { IComment } from "./types/comments";

const Schema = mongoose.Schema;

const commentSchema = new Schema<IComment>(
  {
    content: { type: String, required: true },
    name: { type: String, required: true },
    email: {
        type: String,
        required: true
    },
    postId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Post",
      required: true,
    },
    deletedAt: Date,
  },
  { timestamps: true }
);

const Comment = mongoose.model("Comment", commentSchema);

export default Comment;
