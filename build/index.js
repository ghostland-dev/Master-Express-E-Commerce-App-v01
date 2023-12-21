"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const body_parser_1 = __importDefault(require("body-parser"));
const commandesRoutes_1 = __importDefault(require("./routes/api/commandesRoutes"));
const utilisateursRoutes_1 = __importDefault(require("./routes/api/utilisateursRoutes"));
const produitsRoutes_1 = __importDefault(require("./routes/api/produitsRoutes"));
const app = (0, express_1.default)();
// Middleware
app.use((0, cors_1.default)());
app.use(body_parser_1.default.json());
// Routes
app.get('/', (req, res) => {
    res.send('API E-commerce');
});
app.use('/api/v1', commandesRoutes_1.default);
app.use('/api/v1', utilisateursRoutes_1.default);
app.use('/api/v1', produitsRoutes_1.default);
exports.default = app;
