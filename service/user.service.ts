import { User } from "../db/model/user.model";
import { IUser } from "./../db/types/db.d";
import bcrypt from "bcrypt";

export const saveUser = async (userData: IUser) => {
  //init a new Mongo User
  const user = new User(userData);

  //hash the password:
  user.password = await bcrypt.hash(user.password, 12);

  //save the user:
  const savedUser = await user.save();

  return savedUser;
};

export const userService = { saveUser };
