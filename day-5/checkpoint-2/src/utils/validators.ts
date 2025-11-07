import Joi from "joi";

export const supplierRegisterSchema = Joi.object({
  name: Joi.string().min(3).required(),
  email: Joi.string().email().required(),
  password: Joi.string().min(6).required(),
  sensitiveInfo: Joi.string().allow(null, "")
});

export const supplierLoginSchema = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().required()
});

export const productCreateSchema = Joi.object({
  name: Joi.string().min(3).required(),
  description: Joi.string().allow(null, ""),
  price: Joi.number().min(0).required()
});
