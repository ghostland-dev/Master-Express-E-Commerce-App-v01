import { Request, Response, NextFunction } from 'express';

export const authorizeRole = (requiredRole: string) => {
  return (req: Request, res: Response, next: NextFunction) => {
    const utilisateurRole = (req.body as { role: string })?.role;
    console.log(utilisateurRole);

    if (!utilisateurRole || utilisateurRole !== requiredRole) {
      return res.status(403).json({ message: 'Forbidden' });
    }

    next();
  };
};
