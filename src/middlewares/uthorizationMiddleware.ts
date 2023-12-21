import { Request, Response, NextFunction } from 'express';

export const authorizeRole = (requiredRole: string) => {
  return (req: Request, res: Response, next: NextFunction) => {
    const userRole = (req.user as unknown as { role: string }).role;

    if (userRole !== requiredRole) {
      return res.status(403).json({ message: 'Forbidden' });
    }

    next();
  };
};