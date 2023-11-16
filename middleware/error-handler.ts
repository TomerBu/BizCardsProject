import { ErrorRequestHandler } from "express";
import { ApplicationError } from "../error/application-error";

export const errorHandler: ErrorRequestHandler = (e, req, res, next) => {
  // console.log(e.constructor.name);

  //specific to our app :
  if (e instanceof ApplicationError) {
    return res.status(e.status).json({ message: e.message });
  }

  //specific express: Bad JSON:
  if (e instanceof SyntaxError && "status" in e) {
    return res
      .status(e.status as number)
      .json({ message: e.message, name: e.name });
  }

  // Catch-all:
  if (e instanceof Error) {
    return res.status(500).json({ message: e.message, e, source: "other" });
  } else {
    return res.status(500).json({ message: "Something went wrong" });
  }
};
