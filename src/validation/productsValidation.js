import { Joi, Segments } from 'celebrate';
import { isValidObjectId } from 'mongoose';
import { CATEGORIES } from '../constanst/categories.js';

const objectIdValidator = (value, helper) => {
  return !isValidObjectId(value) ? helper.message('Invalid id format') : value;
};

export const getProductsShema = {
  [Segments.QUERY]: Joi.object({
    page: Joi.number().integer().min(1).default(1),
    per_Page:Joi.number().integer().min(5).max(20).default(10),
    category: Joi.string().valid(...CATEGORIES),
    minPrice: Joi.number().positive(),
    maxPrice: Joi.number().positive(),
  }),
};

export const productIdParamsShema = {
  [Segments.PARAMS]: Joi.object({
    productId: Joi.string().custom(objectIdValidator).required(),
  }),
};

export const createProductsShema = {
  [Segments.BODY]: Joi.object({
    name: Joi.string().required().min(5).max(30).trim(),
    price: Joi.number().required(),
    category: Joi.string()
      .valid(...CATEGORIES)
      .default('other'),
    description: Joi.string().max(300),
  }),
};

export const updateProductsShema = {
  ...productIdParamsShema,
  [Segments.BODY]: Joi.object({
    name: Joi.string().min(5).max(30).trim(),
    price: Joi.number(),
    category: Joi.string().valid(...CATEGORIES),
    description: Joi.string().max(300),
  }).min(1),
};
