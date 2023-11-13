import { Router } from "express";
import { ILogin, IUser } from "../db/types/db";
import { validateLogin, validateUser } from "../middleware/validate-schema";
import { userService } from "../service/user.service";
import { User } from "../db/model/user.model";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const router = Router();

//Register
router.post("/", validateUser, async (req, res, next) => {
  const body = req.body as IUser;

  try {
    const savedUser = await userService.saveUser(body);
    return res.status(200).json(savedUser);
  } catch (e) {
    //BAD Request (validation failed)
    return res.status(400).json(e);
  }
});

//Login:
router.post("/login", validateLogin, async (req, res, next) => {
  const { email, password } = req.body as ILogin;

  //find the user from the database by email
  const user = await User.findOne({ email });

  if (!user) {
    return res.status(401).json({ message: "Email or password dont match" });
  }
  //use bcrypt to check the password
  const matches = await bcrypt.compare(password, user.password);

  const token = jwt.sign({email, id: user._id, isAdmin: user.isAdmin}, "secret");

  if (!matches)
    return res.status(401).json({ message: "Email or password dont match" });

  return res.json({ token: token });
});

export default router;
