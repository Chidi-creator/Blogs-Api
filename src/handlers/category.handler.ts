import { ValidationError } from "@managers/error.manager";
import responseManager from "@managers/index";
import { ICategory } from "@models/types/category";
import CategoryUseCase from "@usecases/category.usecase";
import { Request, Response } from "express";
import mongoose from "mongoose";

export default class CategoryHandler {
    private categoryUseCase: CategoryUseCase;
  
    constructor() {
      this.categoryUseCase = new CategoryUseCase();
    }
  
     createCategory = async(req: Request, res: Response) =>{
      try {
        const categoryData: ICategory = req.body;
  
        const category = await this.categoryUseCase.createCategory(categoryData);
        responseManager.success(res, category, "Category created successfully");
      } catch (error: any) {
        responseManager.handleError(res, error);
      }
    }
  
     findAllCategories = async(req: Request, res: Response) => {
      try {
        const categories = await this.categoryUseCase.findAllCategories();
        responseManager.success(res, categories, "Categories retrieved successfully");
      } catch (error: any) {
        responseManager.handleError(res, error);
      }
    }

  
    async findCategoryById(req: Request, res: Response) {
      try {
        const categoryId = req.params.id;
  
        if (!mongoose.Types.ObjectId.isValid(categoryId)) {
          throw new ValidationError("Invalid category ID format");
        }
  
        const category = await this.categoryUseCase.findCategoryById(new mongoose.Types.ObjectId(categoryId));
        if (!category) {
          return responseManager.notFound(res, "Category not found");
        }
  
        responseManager.success(res, category, "Category retrieved successfully");
      } catch (error: any) {
        responseManager.handleError(res, error);
      }
    }
  
     updateCategory = async(req: Request, res: Response)=> {
      try {
        const categoryId = req.params.id;
        const updateData: Partial<ICategory> = req.body;
  
        if (!mongoose.Types.ObjectId.isValid(categoryId)) {
          throw new ValidationError("Invalid category ID format");
        }
  
        const updatedCategory = await this.categoryUseCase.updateCategory(new mongoose.Types.ObjectId(categoryId), updateData);
        if (!updatedCategory) {
          return responseManager.notFound(res, "Category not found");
        }
  
        responseManager.success(res, updatedCategory, "Category updated successfully");
      } catch (error: any) {
        responseManager.handleError(res, error);
      }
    }
  
     deleteCategory = async(req: Request, res: Response) => {
      try {
        const categoryId = req.params.id;
  
        if (!mongoose.Types.ObjectId.isValid(categoryId)) {
          throw new ValidationError("Invalid category ID format");
        }
  
        const deletedCategory = await this.categoryUseCase.deleteCategory(new mongoose.Types.ObjectId(categoryId));
        if (!deletedCategory) {
          return responseManager.notFound(res, "Category not found");
        }
  
        responseManager.success(res, deletedCategory, "Category deleted successfully", 204);
      } catch (error: any) {
        responseManager.handleError(res, error);
      }
    }
  }