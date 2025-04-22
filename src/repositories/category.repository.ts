import { DatabaseError } from "@managers/error.manager";
import { ICategory } from "@models/types/category";
import Category from "@models/Category";
import mongoose from "mongoose";

export default class CategoryRepository {
  async createCategory(categoryData: ICategory): Promise<ICategory> {
    try {
      const category = await Category.create(categoryData);
      return category;
    } catch (error: any) {
      throw new DatabaseError(`Error creating category: ${error.message}`);
    }
  }

  async findAllCategories(): Promise<ICategory[]> {
    try {
      const categories = await Category.find().sort({ createdAt: 1 });
      return categories;
    } catch (error: any) {
      throw new DatabaseError(`Error fetching categories: ${error.message}`);
    }
  }

  async findCategoryById(
    id: mongoose.Types.ObjectId
  ): Promise<ICategory | null> {
    try {
      const category = await Category.findById(id);
      return category;
    } catch (error: any) {
      throw new DatabaseError(`Error finding category by ID: ${error.message}`);
    }
  }

  async updateCategory(
    id: mongoose.Types.ObjectId,
    updateData: Partial<ICategory>
  ): Promise<ICategory | null> {
    try {
      const updatedCategory = await Category.findByIdAndUpdate(
        id,
        { $set: updateData },
        { new: true }
      );
      return updatedCategory;
    } catch (error: any) {
      throw new DatabaseError(`Error updating category: ${error.message}`);
    }
  }

  async deleteCategory(id: mongoose.Types.ObjectId): Promise<ICategory | null> {
    try {
      const deletedCategory = await Category.findByIdAndDelete(id);
      return deletedCategory;
    } catch (error: any) {
      throw new DatabaseError(`Error deleting category: ${error.message}`);
    }
  }
}
