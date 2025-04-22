import CommentRepository from "@repositories/comments.repository";
import { IComment } from "src/models/types/comments";
import mongoose from "mongoose";

export default class CommentUseCase {
  private commentRepository: CommentRepository;

  constructor() {
    this.commentRepository = new CommentRepository();
  }

  async createComment(commentData: IComment): Promise<IComment> {
    try {
      return await this.commentRepository.createComment(commentData);
    } catch (error) {
      throw error;
    }
  }

  async findCommentsByPostId(
    postId: mongoose.Types.ObjectId
  ): Promise<Array<IComment>> {
    try {
      return await this.commentRepository.findCommentsByPostId(postId);
    } catch (error) {
      throw error;
    }
  }

  async findCommentById(
    commentId: mongoose.Types.ObjectId
  ): Promise<IComment | null> {
    try {
      return await this.commentRepository.findCommentById(commentId);
    } catch (error) {
      throw error;
    }
  }

  async updateComment(
    commentId: mongoose.Types.ObjectId,
    updateData: Partial<IComment>
  ): Promise<IComment | null> {
    try {
      return await this.commentRepository.updateComment(commentId, updateData);
    } catch (error) {
      throw error;
    }
  }

  async deleteComment(
    commentId: mongoose.Types.ObjectId
  ): Promise<IComment | null> {
    try {
      return await this.commentRepository.deleteComment(commentId);
    } catch (error) {
      throw error;
    }
  }
}
