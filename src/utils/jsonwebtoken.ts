import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import { SECRET_KEY } from './constants';

 

export const generateAccessToken = (userId: string, roles: string): string => {
    console.log(SECRET_KEY);
  return jwt.sign({ userId, roles }, SECRET_KEY, { expiresIn: '15m' });
};

export const generateRefreshToken = async (): Promise<string> => {
  const refreshToken = await bcrypt.hash(new Date().toString(), 10);
  return refreshToken;
};