import ApiError from "@/errors/ApiError";
import { NextFunction, Request, Response } from "express";

const errorHandler = (
  error: Error,
  _res: Request,
  res: Response,
  _next: NextFunction
) => {
  if (error instanceof ApiError) {
    const { message, statusCode } = error;
    return res.status(statusCode).json({ type: "error", message, statusCode });
  }

  console.error(error.message);

  return res.status(500).json({
    type: "error",
    message: "Internal Server Error!",
    statusCode: 500,
  });
};

export { errorHandler };
