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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const config_1 = __importDefault(require("../../db/config"));
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
        req.params.id = id.toString(); // Met à jour le paramètre d'ID pour être un nombre
        next();
    }
};
router.get('/utilisateurs/liste', handleErrors((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const utilisateurs = yield config_1.default.utilisateur.findMany();
    res.json(utilisateurs);
})));
router.get('/utilisateurs/:id', validateIdParam, handleErrors((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const utilisateur = yield config_1.default.utilisateur.findUnique({
        where: {
            id: req.params.id,
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
    const nouvelUtilisateur = yield config_1.default.utilisateur.create({
        data: req.body,
    });
    res.json(nouvelUtilisateur);
})));
router.put('/utilisateurs/:id', validateIdParam, handleErrors((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const utilisateurModifie = yield config_1.default.utilisateur.update({
        where: {
            id: req.params.id,
        },
        data: req.body,
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
