import express, { Request, Response } from 'express';
import prisma from '../../db/config';

const rotuer = express.Router();

// Middleware pour gérer les erreurs

const handleErrors = (fn: any) => async (req: Request, res: Response) => {
  try {
    await fn(req, res);
  } catch (error) {
    console.error(error);
    res.status(500).json({ erreur: 'Erreur interne du serveur' });
  }
};

// Middleware pour valider les paramètres d'ID

const validateIdParam = (req: Request, res: Response, next: any) => {
  const id = parseInt(req.params.id, 10);
  if (isNaN(id)) {
    res.status(400).json({ erreur: 'ID invalide' });
  } else {
    req.params.id = id.toString(); // Met à jour le paramètre d'ID pour être un nombre
    next();
  }
};
 
rotuer.get('/', handleErrors(async (req: any, res:any ) => {
  res.render('acceuil');
}));
rotuer.get('/creer', handleErrors(async (req: any, res:any ) => {
  res.render('pages/produits/creer');
}));


export default rotuer;