// authRoutes.ts
import express, { Request, Response } from 'express';
import bcrypt from 'bcrypt';
import { generateAccessToken, generateRefreshToken } from './../../utils/jsonwebtoken'
import prisma from '../../db/config';

const router = express.Router();

router.post('/register', async (req: Request, res: Response) => {
  const { nom, prenom, email, motDePasse, role } = req.body;

  const hashedPassword = await bcrypt.hash(motDePasse, 10);
  const refreshToken = await generateRefreshToken();

  const newutilsiateur = await prisma.utilisateur.create({
    data: {
      nom,
      prenom,
      email,
      motDePasse: hashedPassword,
      role,
      refreshToken,
    },
  });

  const accessToken = generateAccessToken(newutilsiateur.id.toString(), newutilsiateur.role);

  res.json({ accessToken, refreshToken });
});

router.post('/login', async (req: Request, res: Response) => {
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

  res.json({ accessToken, refreshToken });
});

export default router;
