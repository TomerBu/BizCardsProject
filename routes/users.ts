import { Router } from "express";
import { User } from "../db/model/user.model";
import { ILogin, IUser, IUserUpdate } from "../db/types/db";
import {
  validateLogin,
  validateUser,
  validateUserUpdate,
} from "../middleware/validate-schema";
import { verifyAdmin } from "../middleware/verify-admin";
import { userService } from "../service/user.service";
import { verifyUserOrAdmin } from "../middleware/verify-user-or-admin";
import { verifyUser } from "../middleware/verify-user";

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
  try {
    const { email, password } = req.body as ILogin;
    const token = await userService.login(email, password);
    return res.status(200).json({ token });
  } catch (e) {
    next(e);
  }
});

//Get all users
router.get("/", verifyAdmin, async (req, res, next) => {
  const users = await User.find();
  res.json(users);
});

//Get user by id:
router.get("/:id", verifyUserOrAdmin, async (req, res, next) => {
  try {
    const id = req.params.id;

    const user = await User.findById(id);
    if (!user) {
      return res.status(404).json({ message: `user with id: ${id} Not found` });
    }
    res.json(user);
  } catch (e) {
    next(e);
  }
});

//Update user by id:
router.put("/:id", verifyUser, validateUser, async (req, res, next) => {
  try {
    const id = req.params.id;
    const body = req.body as IUser;

    const updatedUser = await User.findByIdAndUpdate(id, body, {
      new: true,
      /*
      By default, findOneAndUpdate() returns the document as it was <b>before</b> update
      Setting new: true, returns the document <b>after</b> update was applied
      */
    });

    if (!updatedUser) {
      return res.status(404).json({ message: `user with id: ${id} Not found` });
    }
    res.json(updatedUser);
  } catch (e) {
    next(e);
  }
});

//Patch user by id:
router.patch("/:id", verifyUser, validateUserUpdate, async (req, res, next) => {
  try {
    const id = req.params.id;
    const body = req.body as IUserUpdate;

    const updatedUser = await User.findByIdAndUpdate(id, body, {
      new: true,
    });
    if (!updatedUser) {
      return res.status(404).json({ message: `user with id: ${id} Not found` });
    }
    res.json(updatedUser);
  } catch (e) {
    next(e);
  }
});

//Delete user by id:
router.delete("/:id", verifyUserOrAdmin, async (req, res, next) => {
  try {
    const id = req.params.id;

    const deletedUser = await User.findByIdAndDelete(id);
    if (!deletedUser) {
      return res.status(404).json({ message: `user with id: ${id} Not found` });
    }
    res.json(deletedUser);
  } catch (e) {
    next(e);
  }
});
export default router;

//try{const token = service.login(req.body);  res.status(200).json({token: token})}
//catch(e){res.status(401).json({message: ""})}
