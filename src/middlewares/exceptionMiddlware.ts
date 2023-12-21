import { Request, Response, NextFunction } from 'express';

export const handleErrors = (
  err: Error,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  console.error(err.stack);

  // Votre code métier pour gérer les erreurs
  res.status(500).json({ erreur: 'Erreur interne du serveur' });
};
