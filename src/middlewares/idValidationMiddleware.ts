import { Request, Response, NextFunction } from 'express';

export const validateIdParam = (req: Request, res: Response, next: NextFunction) => {
  const id = parseInt(req.params.id, 10);
  if (isNaN(id)) {
    res.status(400).json({ erreur: 'ID invalide' });
  } else {
    req.params.id = id.toString();
    next();
  }
};
