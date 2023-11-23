import { RequestHandler } from "express";
import { ApplicationError } from "../error/application-error";
import jwt from "jsonwebtoken";
import { RequestUser } from "../@types/express";

export const verifyUserOrAdmin: RequestHandler = (req, res, next) => {
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
      return next();
    }

    if (req.params.id === req.user?.id) {
      return next();
    }

    //not admin, and not same user -> throw error:
    throw new ApplicationError(401, "Only registered user or admin");
  } catch (e) {
    next(e);
  }
};
