import Joi from "joi";
import { IComment } from "@models/types/comments";

export const validateComment = (object: IComment) => {
  const schema = Joi.object({
    content: Joi.string().required(),
    name: Joi.string().required(),
    email: Joi.string().email().required(),
    postId: Joi.string().hex().length(24).required(),
    deletedAt: Joi.date().optional(),
  });

  return schema.validate(object, { abortEarly: false });
};
