import { ITag } from "@models/types/tags";
import Tag from "@models/Tags";
import { DatabaseError } from "@managers/error.manager";
import mongoose from "mongoose";

export default class TagRepository {
  async createTag(tagData: ITag): Promise<ITag> {
    try {
      const tag = await Tag.create(tagData);
      return tag;
    } catch (error: any) {
      throw new DatabaseError(`Error creating tag: ${error.message}`);
    }
  }

  async findAllTags(): Promise<ITag[]> {
    try {
      const tags = await Tag.find().sort({ createdAt: 1 });
      return tags;
    } catch (error: any) {
      throw new DatabaseError(`Error fetching tags: ${error.message}`);
    }
  }

  async findTagById(id: mongoose.Types.ObjectId): Promise<ITag | null> {
    try {
      const tag = await Tag.findById(id);
      return tag;
    } catch (error: any) {
      throw new DatabaseError(`Error finding tag by ID: ${error.message}`);
    }
  }

  async updateTag(
    id: mongoose.Types.ObjectId,
    updateData: Partial<ITag>
  ): Promise<ITag | null> {
    try {
      const updatedTag = await Tag.findByIdAndUpdate(
        id,
        { $set: updateData },
        { new: true }
      );
      return updatedTag;
    } catch (error: any) {
      throw new DatabaseError(`Error updating tag: ${error.message}`);
    }
  }

  async deleteTag(id: mongoose.Types.ObjectId): Promise<ITag | null> {
    try {
      const deletedTag = await Tag.findByIdAndDelete(id);
      return deletedTag;
    } catch (error: any) {
      throw new DatabaseError(`Error deleting tag: ${error.message}`);
    }
  }

}
