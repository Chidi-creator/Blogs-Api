import PostRepository from "@repositories/post.repository"; // Adjust the import based on your structure
import { IPost } from "src/models/types/post";
import mongoose from "mongoose";

export default class PostUseCase {
  private postRepository: PostRepository;

  constructor() {
    this.postRepository = new PostRepository();
  }

  async createPost(postData: IPost): Promise<IPost> {
    try {
      return await this.postRepository.CreatePost(postData);
    } catch (error) {
      throw error;
    }
  }

  async createMany(postsData: Array<IPost>): Promise<Array<IPost>> {
    try {
      return await this.postRepository.createMany(postsData);
    } catch (error) {
      throw error;
    }
  }

  async findAllPosts(): Promise<Array<IPost>> {
    try {
      return await this.postRepository.findAllPosts();
    } catch (error) {
      throw error;
    }
  }

  async findPostById(id: mongoose.Types.ObjectId): Promise<IPost | null> {
    return await this.postRepository.findPostById(id);
  }

  async updatePostById(
    id: mongoose.Types.ObjectId,
    updateData: Partial<IPost>
  ): Promise<IPost | null> {
    try {
      return await this.postRepository.updatePostById(id, updateData);
    } catch (error) {
      throw error;
    }
  }
  async findPostsByCategoryId(
    categoryid: mongoose.Types.ObjectId
  ): Promise<Array<IPost>> {
    try {
      return await this.postRepository.findPostsByCatergoryId(categoryid);
    } catch (error) {
      throw error;
    }
  }

  async deletePost(id: mongoose.Types.ObjectId): Promise<IPost | null> {
    try {
      return await this.postRepository.DeletePost(id);
    } catch (error) {
      throw error;
    }
  }

  async findByQuery(query: { keyword?: string }): Promise<Array<IPost>> {
    try {
      return await this.postRepository.findByQuery(query);
    } catch (error) {
      throw error;
    }
  }
}
