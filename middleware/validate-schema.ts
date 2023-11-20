import { RequestHandler } from "express";
import Joi from "joi";
import { joiUserSchema } from "../validators/user.joi";
import { joiCardSchema } from "../validators/card.joi";
import { joiLoginSchema } from "../validators/login.joi";

type ValidateSchema = (schema: Joi.ObjectSchema) => RequestHandler;

export const validateSchema: ValidateSchema =
  (schema) => async (req, res, next) => {
    try {
      //check validation
      await schema.validateAsync(req.body);
      //if all is good - pass to the next route
      next();
    } catch (e) {
      //400 - bad request - validation failed
      return next(e);
    }
  };

export const validateUser = validateSchema(joiUserSchema);
export const validateLogin = validateSchema(joiLoginSchema);
export const validateCard = validateSchema(joiCardSchema);
