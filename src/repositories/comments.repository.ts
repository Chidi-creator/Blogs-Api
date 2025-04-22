import { DatabaseError } from "@managers/error.manager";
import Comment from "@models/Comment";
import { IComment } from "@models/types/comments";
import mongoose from "mongoose";

export default class CommentRepository {
  async createComment(commentData: IComment): Promise<IComment> {
    try {
      const comment = await Comment.create(commentData);
      return comment;
    } catch (error: any) {
      throw new DatabaseError(`Error creating comment: ${error.message}`);
    }
  }

  async findCommentsByPostId(
    postId: mongoose.Types.ObjectId
  ): Promise<IComment[]> {
    try {
      const comments = await Comment.find({ postId, deletedAt: null }).sort({
        createdAt: 1,
      });
      return comments;
    } catch (error: any) {
      throw new DatabaseError(`Error fetching comments: ${error.message}`);
    }
  }

  async deleteComment(
    commentId: mongoose.Types.ObjectId
  ): Promise<IComment | null> {
    try {
      const comment = await Comment.findByIdAndUpdate(
        commentId,
        { $set: { deletedAt: new Date() } },
        { new: true }
      );
      return comment;
    } catch (error: any) {
      throw new DatabaseError(`Error soft-deleting comment: ${error.message}`);
    }
  }

  async updateComment(
    commentId: mongoose.Types.ObjectId,
    updateData: Partial<IComment>
  ): Promise<IComment | null> {
    try {
      const updatedComment = await Comment.findOneAndUpdate(
        { _id: commentId, deletedAt: null },
        { $set: updateData },
        { new: true }
      );
      return updatedComment;
    } catch (error: any) {
      throw new DatabaseError(`Error updating comment: ${error.message}`);
    }
  }

  async findCommentById(id: mongoose.Types.ObjectId): Promise<IComment | null> {
    try {
      const comment = await Comment.findOne({ _id: id, deletedAt: null });
      return comment;
    } catch (error: any) {
      throw new DatabaseError(`Error finding comment by ID: ${error.message}`);
    }
  }
}
