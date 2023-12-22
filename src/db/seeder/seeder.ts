// seed.ts
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

const seedData = [
  // Ajoutez les données que vous souhaitez insérer ici
  {
    nom: 'Nom1',
    prenom: 'Prenom1',
    email: 'email1@example.com',
    motDePasse: 'motdepasse1',
    role: 'utilisateur',
  },
  {
    nom: 'Nom2',
    prenom: 'Prenom2',
    email: 'email2@example.com',
    motDePasse: 'motdepasse2',
    role: 'admin',
  },
  // ...
];

const seedDatabase = async () => {
  for (const utilsiateurData of seedData) {
    await prisma.utilisateur.create({
      data: utilsiateurData,
    });
  }
};

const main = async () => {
  try {
    await seedDatabase();
    console.log('Seed successful');
  } catch (error) {
    console.error('Seed failed:', error);
  } finally {
    await prisma.$disconnect();
  }
};

main();
