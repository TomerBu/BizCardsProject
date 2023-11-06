import { model } from "mongoose";
import { userSchema } from "../schema/user.schema";

//typescript(bonus)
// schema (create table)
// model ~ class with CRUD methods
// Card/User/Role
const User = model("User", userSchema);

export { User };
