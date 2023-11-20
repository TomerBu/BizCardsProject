import { RequestHandler } from "express";
import { ApplicationError } from "../error/application-error";
import jwt from "jsonwebtoken";
import { RequestUser } from "../@types/express";

export const verifyAdmin: RequestHandler = (req, res, next) => {
  //get the Auth header:
  const header = req.headers.authorization;

  // if auth header does not exist - throw
  if (!header) {
    throw new ApplicationError(400, "No Auth Header");
  }

  //get the token from the header (after the space)
  const token = header.split(" ")[1];

  const secret = process.env.JWT_SECRET ?? "";

  try {
    //verify the token:
    const payload = jwt.verify(token, secret) as RequestUser;

    //pass the data to req.user
    req.user = payload;

    if (req.user?.isAdmin) {
      next();
    } else {
      throw new ApplicationError(401, "Only Admin");
    }
  } catch (e) {
    next(e);
  }
};
