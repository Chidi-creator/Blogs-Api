import { DatabaseError } from "@managers/error.manager";
import Post from "src/models/Post";
import { IPost } from "src/models/types/post";
import mongoose from "mongoose";

export default class PostRepository {
  async CreatePost(postData: IPost): Promise<IPost> {
    try {
      const post = await Post.create(postData);
      return post;
    } catch (error: any) {
      throw new DatabaseError(`Error creating Post: ${error.message}`);
    }
  }

  async findAllPosts(): Promise<Array<IPost>> {
    try {
      const posts = await Post.find({ deletedAt: null }).sort({
        createdAt: -1,
      }).populate("tags").populate("category")

      return posts;
    } catch (error: any) {
      throw new DatabaseError(`Error creating Post: ${error.message}`);
    }
  }

  async findByQuery(query: { keyword?: string }): Promise<Array<IPost>> {
    try {
      const resPerPage = 1000;
      const skip = 0;

      const keyword = query.keyword
        ? {
            title: {
              $regex: query.keyword,
              $options: "i",
            },
          }
        : {};
      const posts: IPost[] = await Post.find({ ...keyword, deletedAt: null })
        .limit(resPerPage)
        .skip(skip);

      return posts;
    } catch (error: any) {
      throw new DatabaseError(`Error creating Post: ${error.message}`);
    }
  }

  async findPostById(id: mongoose.Types.ObjectId): Promise<IPost | null> {
    try {
      const post = await Post.findOne({ _id: id, deletedAt: null });
      return post;
    } catch (error: any) {
      throw new DatabaseError(`Error finding post by ID: ${error.message}`);
    }
  }

  async DeletePost(id: mongoose.Types.ObjectId): Promise<IPost | null> {
    try {
      const post = await Post.findByIdAndUpdate(
        id,
        { $set: { deletedAt: new Date() } },
        { new: true }
      );
      return post;
    } catch (error: any) {
      throw new DatabaseError(`Error soft-deleting post: ${error.message}`);
    }
  }

  async updatePostById(
    id: mongoose.Types.ObjectId,
    updateData: Partial<IPost>
  ): Promise<IPost | null> {
    try {
      const updatedPost = await Post.findOneAndUpdate(
        { _id: id, deletedAt: null },
        { $set: updateData },
        { new: true }
      );
      return updatedPost;
    } catch (error: any) {
      throw new DatabaseError(`Error updating post: ${error.message}`);
    }
  }
  async createMany(postsData: Array<IPost>): Promise<Array<IPost>> {
    try {
      const posts = await Post.insertMany(postsData);
      return posts;
    } catch (error: any) {
      throw new DatabaseError(
        `Error creating multiple posts: ${error.message}`
      );
    }
  }

  async findPostsByCatergoryId(
    categoryid: mongoose.Types.ObjectId
  ): Promise<Array<IPost>> {
    try {
      const post = await Post.find({
        category: categoryid,
        deletedAt: null,
      });
      return post;
    } catch (error: any) {
      throw new DatabaseError(`Error finding post by ID: ${error.message}`);
    }
  }
}
