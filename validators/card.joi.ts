import Joi from "joi";
import { IAddress, IImage, ICardInput } from "../db/types/db";
import { patterns } from "./regex-patterns";

export const joiCardSchema = Joi.object<ICardInput>({
  title: Joi.string().min(2).max(256).required(),
  subtitle: Joi.string().min(2).max(256).required(),
  description: Joi.string().min(2).max(1024).required(),
  web: Joi.string().uri().min(14).max(256),
  email: Joi.string().email().min(5).max(30).required(),

  phone: Joi.string()
    .pattern(patterns.phone)
    .min(9)
    .max(11)
    .required(),

  address: Joi.object<IAddress>({
    country: Joi.string().min(2).max(256).required(),
    city: Joi.string().min(2).max(256).required(),
    street: Joi.string().min(2).max(256).required(),
    state: Joi.string().min(2).max(256),
    zip: Joi.number().required(),
    houseNumber: Joi.number().required(),
  }),
  image: Joi.object<IImage>({
    alt: Joi.string().min(2).max(256),
    // TODO: Check with jhonatan about url (we want to limit the max for all strings)
    url: Joi.string().uri().min(14).max(256),
  }),
});
