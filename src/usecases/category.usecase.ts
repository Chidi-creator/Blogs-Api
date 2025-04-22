import CategoryRepository from "@repositories/category.repository";
import { ICategory } from "@models/types/category";
import { DatabaseError } from "@managers/error.manager";
import mongoose from "mongoose";

export default class CategoryUseCase {
  private categoryRepository: CategoryRepository;

  constructor() {
    this.categoryRepository = new CategoryRepository();
  }

  async createCategory(categoryData: ICategory): Promise<ICategory> {
    try {
      return await this.categoryRepository.createCategory(categoryData);
    } catch (error: any) {
      throw new DatabaseError(`Error creating category: ${error.message}`);
    }
  }

  async findAllCategories(): Promise<ICategory[]> {
    try {
      return await this.categoryRepository.findAllCategories();
    } catch (error: any) {
      throw new DatabaseError(`Error fetching categories: ${error.message}`);
    }
  }

  async findCategoryById(
    id: mongoose.Types.ObjectId
  ): Promise<ICategory | null> {
    try {
      return await this.categoryRepository.findCategoryById(id);
    } catch (error: any) {
      throw new DatabaseError(`Error finding category by ID: ${error.message}`);
    }
  }

  async updateCategory(
    id: mongoose.Types.ObjectId,
    updateData: Partial<ICategory>
  ): Promise<ICategory | null> {
    try {
      return await this.categoryRepository.updateCategory(id, updateData);
    } catch (error: any) {
      throw new DatabaseError(`Error updating category: ${error.message}`);
    }
  }

  async deleteCategory(id: mongoose.Types.ObjectId): Promise<ICategory | null> {
    try {
      return await this.categoryRepository.deleteCategory(id);
    } catch (error: any) {
      throw new DatabaseError(`Error deleting category: ${error.message}`);
    }
  }
}
