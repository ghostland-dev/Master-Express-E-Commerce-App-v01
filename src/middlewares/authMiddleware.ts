import expressJwt, { expressjwt } from 'express-jwt';
import { Request, RequestHandler } from 'express';
import { SECRET_KEY } from '../utils/constants';
 
export const authenticateJwt: RequestHandler = expressjwt({
  secret: SECRET_KEY,
  algorithms: ['HS256'],
  getToken: (req: Request) => req.headers.authorization?.split(' ')[1],
});

export const checkRoles = (roles: string[]): RequestHandler => (req, res, next) => {
  const utilisateurRoles = (req.utilsiateur as { roles: string }).roles.split(',');

  if (roles.some((role) => utilisateurRoles.includes(role))) {
    next();
  } else {
    res.json({ codeStatus:403, message: 'Unauthorized' });
  }
};

 
