import { ValidationError } from "@managers/error.manager";
import responseManager from "@managers/index";
import { IPost } from "src/models/types/post";
import PostUseCase from "@usecases/post.usecase";
import { Request, Response } from "express";
import { validatePost } from "src/validations/post.validation";
import mongoose from "mongoose";

export default class PostHandler {
  private postUseCase: PostUseCase;

  constructor() {
    this.postUseCase = new PostUseCase();
  }

  createPost = async (req: Request, res: Response) => {
    try {
      const postData: IPost = req.body;

      if (req.file) {
        const baseUrl = `${req.protocol}://${req.get("host")}`;
        postData.imageUrl = `${baseUrl}/uploads/${req.file.filename}`;
      }

      if( req.body.Tags) {
        const tags = Array.isArray(req.body.tags)
        ? req.body.tags
        : [req.body.tags]; 

      postData.tags = tags.map((id: string) => new mongoose.Types.ObjectId(id));
      }

      const { error } = validatePost(postData);

      if (error) {
        throw new ValidationError(
          `Validation failed ${error.details.map((e) => e.message).join(",")}`
        );
      }

      const post = await this.postUseCase.createPost(postData);

      responseManager.success(res, post, "Post created Successfully");
    } catch (error: any) {
      responseManager.handleError(res, error);
    }
  };

  createManyPosts = async (req: Request, res: Response) => {
    try {
      const postsData: Array<IPost> = req.body;

      // Validate each post in the array
      for (const post of postsData) {
        const { error } = validatePost(post);
        if (error) {
          throw new ValidationError(
            `Validation failed: ${error.details
              .map((e) => e.message)
              .join(", ")}`
          );
        }
      }

      const createdPosts = await this.postUseCase.createMany(postsData);
      responseManager.success(res, createdPosts, "Posts created successfully");
    } catch (error: any) {
      responseManager.handleError(res, error);
    }
  };

  findAllPosts = async (req: Request, res: Response) => {
    try {
      const posts = await this.postUseCase.findAllPosts();
      responseManager.success(res, posts, "Posts retrieved successfully");
    } catch (error: any) {
      responseManager.handleError(res, error);
    }
  };

  findPostById = async (req: Request, res: Response) => {
    try {
      const id = req.params.id;

      if (!mongoose.Types.ObjectId.isValid(id)) {
        throw new ValidationError("Invalid post ID format");
      }

      const post = await this.postUseCase.findPostById(
        new mongoose.Types.ObjectId(id)
      );
      if (!post) {
        return responseManager.notFound(res, "Post not found");
      }

      responseManager.success(res, post, "Post retrieved successfully");
    } catch (error: any) {
      responseManager.handleError(res, error);
    }
  };

  updatePostById = async (req: Request, res: Response) => {
    try {
      const id = req.params.id;
      const updateData: Partial<IPost> = req.body;

      if (!mongoose.Types.ObjectId.isValid(id)) {
        throw new ValidationError("Invalid post ID format");
      }

      const updatedPost = await this.postUseCase.updatePostById(
        new mongoose.Types.ObjectId(id),
        updateData
      );
      if (!updatedPost) {
        return responseManager.notFound(
          res,
          "Post not found or already deleted"
        );
      }

      responseManager.success(res, updatedPost, "Post updated successfully");
    } catch (error: any) {
      responseManager.handleError(res, error);
    }
  };

  deletePost = async (req: Request, res: Response) => {
    try {
      const id = req.params.id;

      if (!mongoose.Types.ObjectId.isValid(id)) {
        throw new ValidationError("Invalid post ID format");
      }

      const deletedPost = await this.postUseCase.deletePost(
        new mongoose.Types.ObjectId(id)
      );
      if (!deletedPost) {
        return responseManager.notFound(res, "Post not found");
      }

      responseManager.success(
        res,
        deletedPost,
        "Post deleted successfully",
        204
      );
    } catch (error: any) {
      responseManager.handleError(res, error);
    }
  };

  findByQuery = async (req: Request, res: Response) => {
    try {
      const query = req.query; // Get query parameters
      const posts = await this.postUseCase.findByQuery(query);
      responseManager.success(res, posts, "Posts retrieved successfully");
    } catch (error: any) {
      responseManager.handleError(res, error);
    }
  };

  findPostByCategoryId = async (req: Request, res: Response) => {
    try {
      const categoryid = req.params.id;
      if (!mongoose.Types.ObjectId.isValid(categoryid)) {
        throw new ValidationError("Invalid post ID format");
      }

      const post = await this.postUseCase.findPostsByCategoryId(
        new mongoose.Types.ObjectId(categoryid)
      );
      if (!post) {
        return responseManager.notFound(res, "Post not found");
      }

      responseManager.success(res, post, "Post retrieved successfully");
    } catch (error: any) {
      responseManager.handleError(res, error);
    }
  };
}
