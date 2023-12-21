"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const config_1 = __importDefault(require("../../db/config"));
const bcrypt = __importStar(require("bcrypt"));
const router = express_1.default.Router();
// Middleware pour gérer les erreurs
const handleErrors = (fn) => (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield fn(req, res);
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ erreur: 'Erreur interne du serveur' });
    }
});
// Middleware pour valider les paramètres d'ID
const validateIdParam = (req, res, next) => {
    const id = parseInt(req.params.id, 10);
    if (isNaN(id)) {
        res.status(400).json({ erreur: 'ID invalide' });
    }
    else {
        // Convertissez l'ID en nombre et vérifiez s'il est fini
        const parsedId = Number(id);
        if (isNaN(parsedId) || !Number.isInteger(parsedId)) {
            res.status(400).json({ erreur: 'ID invalide' });
        }
        else {
            req.params.id = parsedId.toString(); // Met à jour le paramètre d'ID pour être un nombre
            next();
        }
    }
};
router.get('/utilisateurs/liste', handleErrors((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const utilisateurs = yield config_1.default.utilisateur.findMany();
    res.json(utilisateurs);
})));
router.get('/utilisateurs/:id', validateIdParam, handleErrors((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const utilisateur = yield config_1.default.utilisateur.findUnique({
        where: {
            id: parseInt(req.params.id),
        },
    });
    if (!utilisateur) {
        res.status(404).json({ erreur: 'Utilisateur non trouvé' });
    }
    else {
        res.json(utilisateur);
    }
})));
router.post('/utilisateurs', handleErrors((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { nom, prenom, email, motDePasse, role } = req.body;
    // Hash the password before storing it
    const hashedPassword = yield bcrypt.hash(motDePasse, 10); // You can adjust the salt rounds (10 is a common value)
    const nouvelUtilisateur = yield config_1.default.utilisateur.create({
        data: {
            nom,
            prenom,
            email,
            motDePasse: hashedPassword, // Store the hashed password
            role,
        },
    });
    res.json(nouvelUtilisateur);
})));
router.put('/utilisateurs/:id', validateIdParam, handleErrors((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { nom, prenom, email, motDePasse, role } = req.body;
    // Hash the password if it's provided in the request
    let hashedPassword;
    if (motDePasse) {
        hashedPassword = yield bcrypt.hash(motDePasse, 10);
    }
    // Build the data object based on provided values
    const data = {};
    if (nom !== null && nom !== undefined) {
        data.nom = nom;
    }
    if (prenom !== null && prenom !== undefined) {
        data.prenom = prenom;
    }
    if (email !== null && email !== undefined) {
        data.email = email;
    }
    if (hashedPassword !== null && hashedPassword !== undefined) {
        data.motDePasse = hashedPassword;
    }
    if (role !== null && role !== undefined) {
        data.role = role;
    }
    const utilisateurModifie = yield config_1.default.utilisateur.update({
        where: {
            id: req.params.id,
        },
        data,
    });
    res.json(utilisateurModifie);
})));
router.delete('/utilisateurs/:id', validateIdParam, handleErrors((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const utilisateurSupprime = yield config_1.default.utilisateur.delete({
        where: {
            id: req.params.id,
        },
    });
    res.json(utilisateurSupprime);
})));
exports.default = router;
