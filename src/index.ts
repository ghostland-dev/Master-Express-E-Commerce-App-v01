import express, { Application, Request, Response, NextFunction } from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';

const app: Application = express();

// Middleware
app.use(cors());
app.use(bodyParser.json());

// Routes
app.get('/', (req: Request, res: Response) => {
  res.send('API E-commerce');
});

export default app;
