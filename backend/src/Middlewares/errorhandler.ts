import { Request, Response, NextFunction } from 'express';
import { HttpError } from '../Utils/HttpError';

export function errorHandler(
  err: HttpError,
  req: Request,
  res: Response,
  next: NextFunction
) {
  const status = err.code|| 500;
  res.status(status).json({
    error: {
      message: err.message,
      status
    }
  });
}
