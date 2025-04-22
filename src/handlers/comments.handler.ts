import { ValidationError } from "@managers/error.manager";
import responseManager from "@managers/index";
import { IComment } from "src/models/types/comments";
import CommentUseCase from "@usecases/comments.usecase";
import { Request, Response } from "express";
import mongoose from "mongoose";
import { validateComment } from "src/validations/comments.valdation";

export default class CommentHandler {
  private commentUseCase: CommentUseCase;

  constructor() {
    this.commentUseCase = new CommentUseCase();
  }

  async createComment(req: Request, res: Response) {
    try {
      const commentData: IComment = req.body;

      const { error } = validateComment(commentData);

      if (error) {
        throw new ValidationError(
          `Validation failed ${error.details.map((e) => e.message).join(",")}`
        );
      }

      const comment = await this.commentUseCase.createComment(commentData);
      responseManager.success(res, comment, "Comment created successfully");
    } catch (error: any) {
      responseManager.handleError(res, error);
    }
  }

  async findCommentsByPostId(req: Request, res: Response) {
    try {
      const postId = req.params.postId;

      if (!mongoose.Types.ObjectId.isValid(postId)) {
        throw new ValidationError("Invalid post ID format");
      }

      const comments = await this.commentUseCase.findCommentsByPostId(new mongoose.Types.ObjectId(postId));
      responseManager.success(res, comments, "Comments retrieved successfully");
    } catch (error: any) {
      responseManager.handleError(res, error);
    }
  }

  async findCommentById(req: Request, res: Response) {
    try {
      const commentId = req.params.id;

      if (!mongoose.Types.ObjectId.isValid(commentId)) {
        throw new ValidationError("Invalid comment ID format");
      }

      const comment = await this.commentUseCase.findCommentById(new mongoose.Types.ObjectId(commentId));
      if (!comment) {
        return responseManager.notFound(res, "Comment not found");
      }

      responseManager.success(res, comment, "Comment retrieved successfully");
    } catch (error: any) {
      responseManager.handleError(res, error);
    }
  }

  async updateComment(req: Request, res: Response) {
    try {
      const commentId = req.params.id;
      const updateData: Partial<IComment> = req.body;

      if (!mongoose.Types.ObjectId.isValid(commentId)) {
        throw new ValidationError("Invalid comment ID format");
      }

      const updatedComment = await this.commentUseCase.updateComment(new mongoose.Types.ObjectId(commentId), updateData);
      if (!updatedComment) {
        return responseManager.notFound(res, "Comment not found");
      }

      responseManager.success(res, updatedComment, "Comment updated successfully");
    } catch (error: any) {
      responseManager.handleError(res, error);
    }
  }

  async deleteComment(req: Request, res: Response) {
    try {
      const commentId = req.params.id;

      if (!mongoose.Types.ObjectId.isValid(commentId)) {
        throw new ValidationError("Invalid comment ID format");
      }

      const deletedComment = await this.commentUseCase.deleteComment(new mongoose.Types.ObjectId(commentId));
      if (!deletedComment) {
        return responseManager.notFound(res, "Comment not found");
      }

      responseManager.success(res, deletedComment, "Comment deleted successfully", 204);
    } catch (error: any) {
      responseManager.handleError(res, error);
    }
  }
}