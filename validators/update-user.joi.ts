import Joi from "joi";
import { IUserUpdate } from "../db/types/db";
 

const schema = Joi.object<IUserUpdate>({
  isBusiness: Joi.boolean().required(),
});

export { schema as joiUpdateUserSchema };
export default schema;
