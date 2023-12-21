import express, { Request, Response } from 'express';
import prisma from '../../db/config';
import { Prisma } from '@prisma/client';

const router = express.Router();

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

router.get('/produits/liste', handleErrors(async (req: any, res: { json: (arg0: { id: number; image: string; nom: string; description: string; prix: number; }[]) => void; }) => {
  const produits = await prisma.produit.findMany();
  res.json(produits);
}));

router.get('/produits/:id', validateIdParam, handleErrors(async (req: { params: { id: any; }; }, res: { status: (arg0: number) => { (): any; new(): any; json: { (arg0: { erreur: string; }): void; new(): any; }; }; json: (arg0: { id: number; image: string; nom: string; description: string; prix: number; }) => void; }) => {
  const produit = await prisma.produit.findUnique({
    where: {
      id: req.params.id,
    },
  });
  if (!produit) {
    res.status(404).json({ erreur: 'Produit non trouvé' });
  } else {
    res.json(produit);
  }
}));

router.post('/produits', handleErrors(async (req: { body: any; }, res: { json: (arg0: { id: number; image: string; nom: string; description: string; prix: number; }) => void; }) => {
  const nouveauProduit = await prisma.produit.create({
    data: req.body,
  });
  res.json(nouveauProduit);
}));

router.put('/produits/:id', validateIdParam, handleErrors(async (req: { params: { id: any; }; body: any; }, res: { json: (arg0: { id: number; image: string; nom: string; description: string; prix: number; }) => void; }) => {
  const produitModifie = await prisma.produit.update({
    where: {
      id: req.params.id,
    },
    data: req.body,
  });
  res.json(produitModifie);
}));

router.delete('/produits/:id', validateIdParam, handleErrors(async (req: { params: { id: any; }; }, res: { json: (arg0: { id: number; image: string; nom: string; description: string; prix: number; }) => void; }) => {
  const produitSupprime = await prisma.produit.delete({
    where: {
      id: req.params.id,
    },
  });
  res.json(produitSupprime);
}));

export default router;
