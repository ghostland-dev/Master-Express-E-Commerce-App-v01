import express, { Application, Request, Response, NextFunction } from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import commandesRoutes from './routes/api/commandesRoutes';
import utilisateursRoutes from './routes/api/utilisateursRoutes';
import produitsRoutes from './routes/api/produitsRoutes';
import authRoutes from './routes/api/authRoutes';
import * as dotenv from 'dotenv';
import { authenticateJwt } from './middlewares/authMiddleware';
dotenv.config();

const app: Application = express();

// Middleware
app.use(cors());
app.use(bodyParser.json());

// Routes
app.get('/', (req: Request, res: Response) => {
  res.send('API E-commerce');
});

app.use('/api/v1',authenticateJwt, commandesRoutes);
app.use('/api/v1', utilisateursRoutes);
app.use('/api/v1', produitsRoutes);
app.use('/api/v1/auth', authRoutes);



export default app;
