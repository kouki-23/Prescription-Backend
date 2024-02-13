// src/Middlewares/validation/validation.ts
import { NextFunction, Request, Response } from "express"
import z from "zod"
import { HttpError, StatusCode } from "../../Utils/HttpError"

export function validateRequestBody(schema: z.Schema) {
  return async (req: Request, res: Response, next: NextFunction) => {
    try {
      await schema.parseAsync(req.body)
      next()
    } catch (error) {
      next(new HttpError("Invalid Request", StatusCode.BadRequest))
    }
  }
}