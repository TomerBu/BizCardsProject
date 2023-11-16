import jwt from "jsonwebtoken";
import { User } from "../db/model/user.model";
import { IUser } from "./../db/types/db.d";
import bcrypt from "bcrypt";
import { ApplicationError } from "../error/application-error";

export const saveUser = async (userData: IUser) => {
  //init a new Mongo User
  const user = new User(userData);

  //hash the password:
  user.password = await bcrypt.hash(user.password, 12);

  //save the user:
  const savedUser = await user.save();

  return savedUser;
};

const getSecret = () => process.env.JWT_SECRET ?? "secret";

const login = async (email: string, password: string) => {
  const user = await User.findOne({ email });

  if (!user) {
    throw new ApplicationError(401, "Bad Credentials");
  }

  const match = await bcrypt.compare(password, user.password);

  if (!match) throw new ApplicationError(401, "Bad Credentials");

  return jwt.sign({ email, id: user._id, isAdmin: user.isAdmin }, getSecret());
};

export const userService = { saveUser, login };
