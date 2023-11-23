import { ErrorRequestHandler } from "express";
import { ApplicationError } from "../error/application-error";
import Joi from "joi";
import { CastError } from "mongoose";

export const errorHandler: ErrorRequestHandler = (e, req, res, next) => {

  //specific to our app :
  if (e instanceof ApplicationError) {
    return res.status(e.status).json({ message: e.message });
  }

  //Joi Validation Error
  if (e instanceof Joi.ValidationError) {
    const { message, details, _original } = e;

    return res
      .status(400)
      .json({ message, details, supplied_object: _original });
  }

  // check if err is CastError
  const err = e as CastError;
  if (err && "name" in err && err.name == "CastError") {
    return res.status(400).json({ message: "Cast Error", err });
  }

  //express.json middleware: Bad JSON:
  if (e instanceof SyntaxError && "status" in e) {
    const status = e.status as number;
    return res.status(status).json({ message: e.message, name: e.name });
  }

  // Catch-all:
  if (e instanceof Error) {
    return res.status(500).json({ message: e.message, e, source: "other" });
  } else {
    return res.status(500).json({ message: "Something went wrong" });
  }
};
