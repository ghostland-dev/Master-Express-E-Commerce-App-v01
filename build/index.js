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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const commandesRoutes_1 = __importDefault(require("./routes/api/commandesRoutes"));
const utilisateursRoutes_1 = __importDefault(require("./routes/api/utilisateursRoutes"));
const produitsRoutes_1 = __importDefault(require("./routes/api/produitsRoutes"));
const baseRoutes_1 = __importDefault(require("./routes/web/baseRoutes"));
const authRoutes_1 = __importDefault(require("./routes/api/authRoutes"));
const dotenv = __importStar(require("dotenv"));
const path_1 = __importDefault(require("path"));
require("twig");
const express_rate_limit_1 = __importDefault(require("express-rate-limit"));
const chokidar = __importStar(require("chokidar"));
const twig_1 = __importDefault(require("twig"));
const exceptionMiddlware_1 = require("./middlewares/exceptionMiddlware");
dotenv.config();
// declaration des variables
const app = (0, express_1.default)();
const viewsDirectory = path_1.default.join(__dirname, 'views');
const watcher = chokidar.watch(viewsDirectory, { ignored: /node_modules/ });
const limiter = (0, express_rate_limit_1.default)({
    windowMs: 15 * 60 * 1000,
    max: 100,
    message: 'votre activité est suspecte, votre adresse IP a été bloquée pendant 15 minutes',
});
// Middleware
app.use((0, cors_1.default)());
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: false }));
app.use('/uploads', express_1.default.static(path_1.default.join(__dirname, 'uploads')));
app.set('views', viewsDirectory);
app.set('view engine', 'twig');
app.use(limiter);
// Juste pour le developpement à commenter en PROD
watcher.on('all', (event, filePath) => {
    if (event === 'change' || event === 'add') {
        console.log(`rechergement de fichier: ${filePath}`);
        twig_1.default.cache(false);
    }
});
// Routes
// app.use('/api/v1', authenticateJwt);
app.use(exceptionMiddlware_1.handleErrors);
app.use('/', baseRoutes_1.default);
app.use('/api/v1', commandesRoutes_1.default);
app.use('/api/v1', utilisateursRoutes_1.default);
app.use('/api/v1', produitsRoutes_1.default);
app.use('/api/v1/auth', authRoutes_1.default);
exports.default = app;
