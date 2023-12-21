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
router.get('/commandes/liste', handleErrors((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const commandes = yield config_1.default.commande.findMany();
    res.json(commandes);
})));
router.get('/commandes/:id', validateIdParam, handleErrors((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const commande = yield config_1.default.commande.findUnique({
        where: {
            id: req.params.id,
        },
    });
    if (!commande) {
        res.status(404).json({ erreur: 'Commande non trouvée' });
    }
    else {
        res.json(commande);
    }
})));
router.post('/commandes', handleErrors((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const nouvelleCommande = yield config_1.default.commande.create({
        data: req.body,
    });
    res.json(nouvelleCommande);
})));
router.put('/commandes/:id', validateIdParam, handleErrors((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const commandeModifiee = yield config_1.default.commande.update({
        where: {
            id: req.params.id,
        },
        data: req.body,
    });
    res.json(commandeModifiee);
})));
router.delete('/commandes/:id', validateIdParam, handleErrors((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const commandeSupprimee = yield config_1.default.commande.delete({
        where: {
            id: req.params.id,
        },
    });
    res.json(commandeSupprimee);
})));
exports.default = router;
