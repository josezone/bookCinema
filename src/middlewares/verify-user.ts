import {NextFunction, Response} from 'express';
import {jwtVerify} from 'jose';
import getEnv from '../config/envs';
import {JWT_ALGO} from '../config/jose.config';
import {importJWK} from 'jose';

export async function verifyUser(req: any, res: Response, next: NextFunction) {
  const privateKey = JSON.parse(getEnv('privateKey'));
  delete privateKey.d;
  const publicKey = await importJWK(privateKey, JWT_ALGO);
  const jwt = req.get('Authorization')?.split(' ')[1];
  if (jwt) {
    try {
      const {payload} = await jwtVerify(jwt, publicKey);
      req.user = payload;
      next();
    } catch (err) {
      res.status(401).send('Unauthorized');
    }
  } else {
    res.status(401).send('Unauthorized');
  }
}

export default verifyUser;
