// authRoutes.ts
import express, { Request, Response } from 'express';
import bcrypt from 'bcrypt';
import { generateAccessToken, generateRefreshToken } from './../../utils/jsonwebtoken'
import prisma from '../../db/config';

const router = express.Router();

router.post('/inscription', async (req: Request, res: Response) => {
  const { nom, prenom, email, motDePasse } = req.body;
  const hashedPassword = await bcrypt.hash(motDePasse, 10);
try {
  
  if (!nom || !prenom || !email || !motDePasse) {
    return res.status(400).json({
      codeStatus: 400,
      message: 'veuillez remplir tous les champs',
    });
  }


  const utilisateurExist = await prisma.utilisateur.findUnique({
    where: {
      email,
    },
  });
  if (utilisateurExist) {
    return res.status(400).json({
      codeStatus: 400,
      message: 'veuillez réessayer avec un autre email',
    });
  }
  

  const nouveauUtilisateur = await prisma.utilisateur.create({
    data: {
      nom,
      prenom,
      email,
      motDePasse: hashedPassword,

    },
  });



  res.json({ nouveauUtilisateur,  message: 'Inscription réussie' });
} catch (error) {
  res.status(500).json({
    codeStatus: 500,
    message: "une erreur est survenue : "+error,
  });  
}
});

router.post('/connexion', async (req: Request, res: Response) => {
  const { email, motDePasse } = req.body;

  const utilsiateur = await prisma.utilisateur.findUnique({
    where: { email },
  });

  if (!utilsiateur || !(await bcrypt.compare(motDePasse, utilsiateur.motDePasse))) {
    return res.status(401).json({ message: 'Invalid credentials' });
  }

  const accessToken = generateAccessToken(utilsiateur.id.toString(), utilsiateur.role);
  const refreshToken = await generateRefreshToken();

  await prisma.utilisateur.update({
    where: { id: utilsiateur.id },
    data: { refreshToken },
  });

  res.json({ accesstoken: "Bearer " + accessToken, refreshToken: "Bearer " + refreshToken });
});

export default router;
