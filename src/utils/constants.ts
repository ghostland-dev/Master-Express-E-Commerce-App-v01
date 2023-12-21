import * as dotenv from 'dotenv';
dotenv.config();
 
declare namespace Express {
    export interface Request {
      user?: any; 
    }
  }


const PORT = process.env.PORT || 3000;
const DB_CONNECTION_STRING = process.env.DATABASE_URL || 'mongodb://localhost:27017/mydatabase';
const SECRET_KEY = process.env.SECRET_KEY || 'mysecret';

export { PORT, DB_CONNECTION_STRING, SECRET_KEY };