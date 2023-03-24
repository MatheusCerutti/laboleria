import joi from "joi";

export const cakeSchema = joi.object({
    name: joi.string().required(),
    price: joi.number().required(),
    description: joi.string().allow(null, '').optional(),
    image: joi.string().uri().required(),
  });
  