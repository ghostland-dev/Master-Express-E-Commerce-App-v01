import express, { Application, Request, Response, NextFunction } from 'express';
import cors from 'cors';
import bodyParser, { Options } from 'body-parser';
import commandesRoutes from './routes/api/commandesRoutes';
import utilisateursRoutes from './routes/api/utilisateursRoutes';
import produitsRoutes from './routes/api/produitsRoutes';
import baseRoutes from './routes/web/baseRoutes';
import authRoutes from './routes/api/authRoutes';
import * as dotenv from 'dotenv';
import { authenticateJwt, checkRoles } from './middlewares/authMiddleware';
import path from 'path';
import 'twig';
import rateLimit from 'express-rate-limit';
 import * as chokidar from 'chokidar';
import Twig from 'twig';
import { handleErrors } from './middlewares/exceptionMiddlware';
dotenv.config();

// declaration des variables
const app: Application = express();
const viewsDirectory = path.join(__dirname, 'views');
const watcher = chokidar.watch(viewsDirectory, { ignored: /node_modules/ });
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,  
  max: 100,  
  message: 'votre activité est suspecte, votre adresse IP a été bloquée pendant 15 minutes',
});

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));
app.set('views', viewsDirectory);
app.set('view engine', 'twig');
app.use(limiter);

// Juste pour le developpement à commenter en PROD
watcher.on('all', (event, filePath) => {
  if (event === 'change' || event === 'add') {
    console.log(`rechergement de fichier: ${filePath}`);
    Twig.cache(false);
  }
});

// Routes
// app.use('/api/v1', authenticateJwt);
app.use(handleErrors);
app.use('/',baseRoutes);
app.use('/api/v1', commandesRoutes);
app.use('/api/v1', utilisateursRoutes);
app.use('/api/v1', produitsRoutes);
app.use('/api/v1/auth', authRoutes);

export default app;
