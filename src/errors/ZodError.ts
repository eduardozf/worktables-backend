import { ZodError } from "zod";
import ApiError from "./ApiError";

export const zodErrorHandler = (error: ZodError): ApiError => {
  const message = JSON.stringify(error.flatten());

  throw new ApiError(message, 406);
};
