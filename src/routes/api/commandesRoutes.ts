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

router.get('/commandes/liste', handleErrors(async (req: any, res: { json: (arg0: { id: number; date: Date; utilisateurId: number; }[]) => void; }) => {
  const commandes = await prisma.commande.findMany();
  res.json(commandes);
}));

router.get('/commandes/:id', validateIdParam, handleErrors(async (req: { params: { id: any; }; }, res: { status: (arg0: number) => { (): any; new(): any; json: { (arg0: { erreur: string; }): void; new(): any; }; }; json: (arg0: { id: number; date: Date; utilisateurId: number; }) => void; }) => {
  const commande = await prisma.commande.findUnique({
    where: {
      id: parseInt(req.params.id),
    },
    include: {
      produits: true, // inclut les produits liés à la commande
      utilisateur: true,
    },
  });
  if (!commande) {
    res.status(404).json({ erreur: 'Commande non trouvée' });
  } else {
    res.json(commande);
  }
}));

router.post('/commandes', handleErrors(async (req: { body: any; }, res: { json: (arg0: { id: number; date: Date; utilisateurId: number; }) => void; }) => {
  const nouvelleCommande = await prisma.commande.create({
    data: req.body,
  });
  res.json(nouvelleCommande);
}));

router.put('/commandes/:id', validateIdParam, handleErrors(async (req: { params: { id: any; }; body: any; }, res: { json: (arg0: { id: number; date: Date; utilisateurId: number; }) => void; }) => {
  const commandeModifiee = await prisma.commande.update({
    where: {
      id: parseInt(req.params.id),
    },
    data: req.body,
  });
  res.json(commandeModifiee);
}));

router.delete('/commandes/:id', validateIdParam, handleErrors(async (req: { params: { id: any; }; }, res: { json: (arg0: { id: number; date: Date; utilisateurId: number; }) => void; }) => {
  const commandeSupprimee = await prisma.commande.delete({
    where: {
      id: req.params.id,
    },
  });
  res.json(commandeSupprimee);
}));

export default router;
