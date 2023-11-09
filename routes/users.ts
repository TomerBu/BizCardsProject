import { Router } from "express";
import { IUser } from "../db/types/db";
import { User } from "../db/model/user.model";

const router = Router();
//POST /api/v1/users/
router.post("/", async (req, res, next) => {
  //const user = req.body (json for new user)
  const body = req.body as IUser;
  if(!body.address || !body.address.city){
    //return res.status(400).json({message: "Bad request"})
  }

  //init a new Mongo User
  const user = new User(body);

  try {
    //save the user:
    const savedUser = await user.save();

    return res.status(200).json(savedUser);
  } catch (e) {
    //BAD Request (validation failed)
    return res.status(400).json(e);
  }
});

export default router;
