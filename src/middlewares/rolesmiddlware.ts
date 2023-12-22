import { Request, Response, NextFunction } from 'express';

// Middleware pour vérifier le rôle d'administrateur
export const isAdmin = (req: Request, res: Response, next: NextFunction) => {
  const utilsiateurRole = req.utilsiateur?.roles; // Supposons que le rôle de l'utilisateur est stocké dans req.utilsiateur

  if (utilsiateurRole === 'admin') {
    return next(); // L'utilisateur a le rôle d'administrateur, continuez
  }

  return res.status(403).json({ error: 'Accès interdit. Vous n\'avez pas les droits d\'administrateur.' });
};

// Middleware pour vérifier le rôle de client
export const isClient = (req: Request, res: Response, next: NextFunction) => {
  const utilsiateurRole = req.utilsiateur?.roles; // Supposons que le rôle de l'utilisateur est stocké dans req.utilsiateur

  if (utilsiateurRole === 'client') {
    return next(); // L'utilisateur a le rôle de client, continuez
  }

  return res.status(403).json({ error: 'Accès interdit. Vous n\'avez pas les droits de client.' });
};
