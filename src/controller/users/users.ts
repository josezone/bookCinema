import bcrypt from 'bcrypt';
import {NextFunction, Request, Response} from 'express';
import {importJWK} from 'jose';
import {SignJWT} from 'jose';
import getEnv from '../../config/envs';
import {JWT_ALGO, JWT_EXPIRY} from '../../config/jose.config';
import {getUserService, insertUserService} from '../../services/user';

export async function createUser(
  req: Request,
  res: Response,
  _next: NextFunction
) {
  const {
    body: {email, name, password},
  } = req;
  const salt = bcrypt.genSaltSync(10);
  const encryptedPassword = await bcrypt.hash(password, salt);
  const user = await getUserService(email);
  if (!user) {
    await insertUserService(email, name, encryptedPassword);
  }
  res.json({status: true});
}

export async function login(req: Request, res: Response, _next: NextFunction) {
  const {
    body: {email, password},
  } = req;
  const user = (await getUserService(email)) as {
    password: string;
    id: number;
  };
  const verifiedPass = await bcrypt.compare(password, user.password);
  if (verifiedPass) {
    const privateKey = await importJWK(
      JSON.parse(getEnv('privateKey')),
      JWT_ALGO
    );
    const token = await new SignJWT({id: user.id})
      .setProtectedHeader({alg: JWT_ALGO})
      .setIssuedAt()
      .setExpirationTime(JWT_EXPIRY)
      .sign(privateKey);
    return res.json({token});
  }
  return res.status(401).json({status: false});
}
