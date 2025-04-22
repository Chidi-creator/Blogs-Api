import { IPost } from "src/models/types/post";
import Joi from "joi";

export const validatePost = (object: IPost) => {
    const schema = Joi.object({
      title: Joi.string().max(100).required(), // Assuming a max length for title
      content: Joi.string().required(),
      imageUrl: Joi.string().uri().optional(), // Optional, should be a valid URI if provided
      author: Joi.string().required(),
      tags: Joi.array().items(Joi.string().hex().length(24)).optional(), // Optional array of ObjectId strings
      category: Joi.string().required(),
      deletedAt: Joi.date().optional(), // Optional date
      comment: Joi.string().hex().length(24).optional() // Optional ObjectId
    });
  
    return schema.validate(object, { abortEarly: false });
  };
