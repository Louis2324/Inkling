import Joi from "joi";

export const BlogSchema = new Joi.object({
    title: Joi.string().min(5).required(),
    body: Joi.string().min(10).required(),
    author : Joi.string().min(4).required()
});

export const updateBlogSchema = Joi.object({
  title: Joi.string().min(3).max(100),
  body: Joi.string().min(10),
});