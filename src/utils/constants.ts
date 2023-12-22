import * as dotenv from 'dotenv';
dotenv.config();
 
declare namespace Express {
    export interface Request {
      utilsiateur?: any; 
    }
  }

const PORT =   3000;
const HOST = process.env.HOST || 'localhost';
const DB_CONNECTION_STRING = process.env.DATABASE_URL || '';
const SECRET_KEY = process.env.SECRET_KEY || '';

export { PORT, DB_CONNECTION_STRING, SECRET_KEY ,HOST};