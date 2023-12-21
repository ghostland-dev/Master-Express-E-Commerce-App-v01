import express, { NextFunction, Request, Response } from 'express';
import { validateIdParam } from './../../middlewares/idValidationMiddleware';
 import fs from 'fs/promises';
import prisma from '../../db/config';
import multer from 'multer';
import path from 'path';
import { upload } from '../../middlewares/uploadMiddleware';
 

const router = express.Router();

 
router.get('/produits/liste', async (req: Request, res: Response) => {
  const produits = await prisma.produit.findMany();
  res.json(produits);
});

router.get('/produits/:id', validateIdParam, async (req: Request, res: Response) => {
  const produit = await prisma.produit.findUnique({
    where: {
      id: parseInt(req.params.id),
    },
  });
  if (!produit) {
    res.status(404).json({ erreur: 'Produit non trouvé' });
  } else {
    res.json(produit);
  }
});

router.post('/produits', upload.single('image'), async (req: Request, res: Response, next: NextFunction) => {
  try {
    const uploadedFile = req.file;

    if (!uploadedFile) {
      return res.status(400).json({ erreur: 'Aucun fichier n\'a été téléchargé' });
    }

    const { nom, description, prix } = req.body;

    // Construct the correct image path
    const imagePath = '/uploads/' + uploadedFile.filename;

    // Save the product with the constructed image path
    const nouveauProduit = await prisma.produit.create({
      data: {
        nom,
        description,
        prix: parseFloat(prix),
        image: imagePath,
      },
    });

    res.json(nouveauProduit);
  } catch (error) {
    console.error(error);
    res.status(500).json({ erreur: 'Erreur interne du serveur' });
  }
});
router.put('/produits/:id', upload.single('image') ,validateIdParam, async (req: Request, res: Response) => {
  const uploadedFile = req.file;

  if (!uploadedFile) {
    res.status(400).json({ erreur: 'Aucun fichier n\'a été téléchargé' });
    return;
  }

  const produitModifie = await prisma.produit.update({
    where: {
      id: parseInt(req.params.id),
    },
    include : {
      ProduitCommande: true,
      _count: true,
    },
    data: {
      ...req.body,
      image: uploadedFile.path,
    },
  });

  res.json(produitModifie);
});

router.delete('/produits/:id', validateIdParam, async (req: Request, res: Response) => {
  const produit = await prisma.produit.findUnique({
    where: {
      id: parseInt(req.params.id),
    },
  });

  if (!produit) {
    res.status(404).json({ erreur: 'Produit non trouvé' });
    return;
  }

  if (produit.image) {
    try {
      await fs.unlink(produit.image);
    } catch (error) {
      console.error(`Erreur lors de la suppression de l'image : ${error}`);
    }
  }

  const produitSupprime = await prisma.produit.delete({
    where: {
      id: parseInt(req.params.id),
    },
  });

  res.json(produitSupprime);
});

export default router;
