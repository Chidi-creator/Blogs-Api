import  mongoose, { Document } from "mongoose";

export interface IPost extends Document{
    title: string;
    content: string;
    imageUrl: string;
    author: string;
    tags?: mongoose.Types.ObjectId[];
    category: mongoose.Types.ObjectId;
    deletedAt?: Date
    comment?: mongoose.Types.ObjectId
}

export type PartialPost = Partial<IPost>