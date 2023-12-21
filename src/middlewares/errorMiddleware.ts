import { Request, Response, NextFunction } from 'express';

export interface ErrorResponse {
  status: number;
  message: string;
}

export const errorMiddleware = (
  err: Error,
  req: Request,
  res: Response,
  next: NextFunction
) => {
   console.error(err);

   const statusCode = err instanceof HttpError ? err.statusCode : 500;

  const response: ErrorResponse = {
    status: statusCode,
    message: err.message || 'Internal Server Error',
  };

  res.status(statusCode).json(response);
};

 export class HttpError extends Error {
  constructor(public statusCode: number, message: string) {
    super(message);
  }
};
