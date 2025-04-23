import mongoose from "mongoose";
import { ITag } from "@models/types/tags";
import TagUseCase from "@usecases/tag.usecase";
import { Request, Response } from "express";
import responseManager from "@managers/index";
import { ValidationError } from "@managers/error.manager";

export default class TagHandler {
  private tagUseCase: TagUseCase;

  constructor() {
    this.tagUseCase = new TagUseCase();
  }

   createTag = async(req: Request, res: Response) =>{
    try {
      const tagData: ITag = req.body;

      const tag = await this.tagUseCase.createTag(tagData);
      responseManager.success(res, tag, "Tag created successfully");
    } catch (error: any) {
      responseManager.handleError(res, error);
    }
  }

   findAllTags = async(req: Request, res: Response) => {
    try {
      const tags = await this.tagUseCase.findAllTags();
      responseManager.success(res, tags, "Tags retrieved successfully");
    } catch (error: any) {
      responseManager.handleError(res, error);
    }
  }

   findTagById = async(req: Request, res: Response) =>{
    try {
      const tagId = req.params.tagid;

      if (!mongoose.Types.ObjectId.isValid(tagId)) {
        throw new ValidationError("Invalid tag ID format");
      }

      const tag = await this.tagUseCase.findTagById(
        new mongoose.Types.ObjectId(tagId)
      );
      if (!tag) {
        return responseManager.notFound(res, "Tag not found");
      }

      responseManager.success(res, tag, "Tag retrieved successfully");
    } catch (error: any) {
      responseManager.handleError(res, error);
    }
  }

   updateTag = async(req: Request, res: Response) => {
    try {
      const tagId = req.params.tagid;
      const updateData: Partial<ITag> = req.body;

      if (!mongoose.Types.ObjectId.isValid(tagId)) {
        throw new ValidationError("Invalid tag ID format");
      }

      const updatedTag = await this.tagUseCase.updateTag(
        new mongoose.Types.ObjectId(tagId),
        updateData
      );
      if (!updatedTag) {
        return responseManager.notFound(res, "Tag not found");
      }

      responseManager.success(res, updatedTag, "Tag updated successfully");
    } catch (error: any) {
      responseManager.handleError(res, error);
    }
  }

   deleteTag = async(req: Request, res: Response) =>{
    try {
      const tagId = req.params.tagid;

      if (!mongoose.Types.ObjectId.isValid(tagId)) {
        throw new ValidationError("Invalid tag ID format");
      }

      const deletedTag = await this.tagUseCase.deleteTag(
        new mongoose.Types.ObjectId(tagId)
      );
      if (!deletedTag) {
        return responseManager.notFound(res, "Tag not found");
      }

      responseManager.success(res, deletedTag, "Tag deleted successfully", 204);
    } catch (error: any) {
      responseManager.handleError(res, error);
    }
  }
}
