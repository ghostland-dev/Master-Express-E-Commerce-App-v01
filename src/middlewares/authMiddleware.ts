// auth-middleware.ts
import { Request, Response, NextFunction } from 'express';

export const authorize = (roles: string[]) => {
  return (req: Request, res: Response, next: NextFunction) => {
    const user = req.user as { role: string };

    if (user && roles.includes(user.role)) {
      next();
    } else {
      return res.status(403).json({ message: 'Forbidden' });
    }
  };
};
