import mongoose, { Document } from "mongoose";


export interface IComment extends Document {
    content: string;
    name: string; 
    email: string;
    postId: mongoose.Types.ObjectId;
    deletedAt?: Date;
  }