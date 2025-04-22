import mongoose from "mongoose";
import { ITag } from "@models/types/tags";
import Tag from "@models/Tags";
import { DatabaseError } from "@managers/error.manager";
import TagRepository from "@repositories/tags.repository";

export default class TagUseCase {
  private tagRepository: TagRepository;

  constructor() {
    this.tagRepository = new TagRepository();
  }

  async createTag(tagData: ITag): Promise<ITag> {
    try {
      return await this.tagRepository.createTag(tagData);
    } catch (error: any) {
      throw new DatabaseError(`Error creating tag: ${error.message}`);
    }
  }

  async findAllTags(): Promise<ITag[]> {
    try {
      return await this.tagRepository.findAllTags();
    } catch (error: any) {
      throw new DatabaseError(`Error fetching tags: ${error.message}`);
    }
  }

  async findTagById(id: mongoose.Types.ObjectId): Promise<ITag | null> {
    try {
      return await this.tagRepository.findTagById(id);
    } catch (error: any) {
      throw new DatabaseError(`Error finding tag by ID: ${error.message}`);
    }
  }

  async updateTag(
    id: mongoose.Types.ObjectId,
    updateData: Partial<ITag>
  ): Promise<ITag | null> {
    try {
      return await this.tagRepository.updateTag(id, updateData);
    } catch (error: any) {
      throw new DatabaseError(`Error updating tag: ${error.message}`);
    }
  }

  async deleteTag(id: mongoose.Types.ObjectId): Promise<ITag | null> {
    try {
      return await this.tagRepository.deleteTag(id);
    } catch (error: any) {
      throw new DatabaseError(`Error deleting tag: ${error.message}`);
    }
  }
}
