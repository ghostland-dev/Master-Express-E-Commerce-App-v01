import express, { Request, Response } from 'express';
import prisma from '../../db/config';

const rotuer = express.Router();

// Middleware pour gérer les erreurs

const handleErrors = (fn: any) => async (req: Request, res: Response) => {
  try {
    await fn(req, res);
  } catch (error) {
    console.error(error);
    res.status(400).json({ erreur: 'une est errror est servenue' });
  }
};


const validateIdParam = (req: Request, res: Response, next: any) => {
  const id = parseInt(req.params.id, 10);
  if (isNaN(id)) {
    res.status(400).json({ erreur: 'ID invalide' });
  } else {
    req.params.id = id.toString();  
    next();
  }
};
 
rotuer.get('/', handleErrors(async (req: any, res:any ) => {
    const produits = await prisma.produit.findMany();
  res.render('acceuil',{produits});
}));
rotuer.get('/creer', handleErrors(async (req: any, res:any ) => {
  res.render('pages/produits/creer');
}));


export default rotuer;