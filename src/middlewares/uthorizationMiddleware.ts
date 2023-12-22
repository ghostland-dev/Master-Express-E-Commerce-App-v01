import { Request, Response, NextFunction } from 'express';

export const authorizeRole = (requiredRole: string) => {
  return (req: Request, res: Response, next: NextFunction) => {
    const utilsiateurRole = (req.utilsiateur as unknown as { role: string }).role;

    if (utilsiateurRole !== requiredRole) {
      return res.status(403).json({ message: 'Forbidden' });
    }

    next();
  };
};