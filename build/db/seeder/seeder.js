"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
// seed.ts
const client_1 = require("@prisma/client");
const prisma = new client_1.PrismaClient();
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
const seedDatabase = () => __awaiter(void 0, void 0, void 0, function* () {
    for (const userData of seedData) {
        yield prisma.utilisateur.create({
            data: userData,
        });
    }
});
const main = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield seedDatabase();
        console.log('Seed successful');
    }
    catch (error) {
        console.error('Seed failed:', error);
    }
    finally {
        yield prisma.$disconnect();
    }
});
main();
