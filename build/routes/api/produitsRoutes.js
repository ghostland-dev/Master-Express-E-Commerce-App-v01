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
const idValidationMiddleware_1 = require("./../../middlewares/idValidationMiddleware");
const uploadMiddleware_1 = require("./../../middlewares/uploadMiddleware");
const promises_1 = __importDefault(require("fs/promises"));
const config_1 = __importDefault(require("../../db/config"));
const router = express_1.default.Router();
router.get('/produits/liste', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const produits = yield config_1.default.produit.findMany();
    res.json(produits);
}));
router.get('/produits/:id', idValidationMiddleware_1.validateIdParam, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const produit = yield config_1.default.produit.findUnique({
        where: {
            id: parseInt(req.params.id),
        },
    });
    if (!produit) {
        res.status(404).json({ erreur: 'Produit non trouvé' });
    }
    else {
        res.json(produit);
    }
}));
router.post('/produits', uploadMiddleware_1.uploadMiddleware, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const uploadedFile = req.file;
    if (!uploadedFile) {
        return res.status(400).json({ erreur: 'Aucun fichier n\'a été téléchargé' });
    }
    const { nom, description, prix } = req.body;
    // Construct the desired image path
    const imagePath = '/src/uploads/produits/' + uploadedFile.filename;
    try {
        // Save the product with the constructed image path
        const nouveauProduit = yield config_1.default.produit.create({
            data: {
                nom,
                description,
                prix: parseFloat(prix),
                image: imagePath,
            },
        });
        res.json(nouveauProduit);
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ erreur: 'Erreur interne du serveur' });
    }
}));
router.put('/produits/:id', idValidationMiddleware_1.validateIdParam, uploadMiddleware_1.uploadMiddleware, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const uploadedFile = req.file;
    if (!uploadedFile) {
        res.status(400).json({ erreur: 'Aucun fichier n\'a été téléchargé' });
        return;
    }
    const produitModifie = yield config_1.default.produit.update({
        where: {
            id: parseInt(req.params.id),
        },
        data: Object.assign(Object.assign({}, req.body), { image: uploadedFile.path }),
    });
    res.json(produitModifie);
}));
router.delete('/produits/:id', idValidationMiddleware_1.validateIdParam, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const produit = yield config_1.default.produit.findUnique({
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
            yield promises_1.default.unlink(produit.image);
        }
        catch (error) {
            console.error(`Erreur lors de la suppression de l'image : ${error}`);
        }
    }
    const produitSupprime = yield config_1.default.produit.delete({
        where: {
            id: parseInt(req.params.id),
        },
    });
    res.json(produitSupprime);
}));
exports.default = router;
