import type {Express, NextFunction, Request, Response} from 'express';
import cors from 'cors';
import corsOptions from './cors-options';
import helmet from 'helmet';

export function setHeaders(app: Express) {
  app.use(
    cors({
      credentials: true,
      origin: corsOptions,
    })
  );
  app.use(helmet.ieNoOpen());
  app.use(helmet.hidePoweredBy());
  app.use(helmet.noSniff());
  app.use(helmet.expectCt({maxAge: 86400, enforce: true}));
  app.use(helmet.hsts({maxAge: 31536000, includeSubDomains: true}));
  app.use(helmet.referrerPolicy({policy: 'no-referrer'}));
  app.use(helmet.dnsPrefetchControl({allow: false}));
  app.use(helmet.permittedCrossDomainPolicies({permittedPolicies: 'none'}));
  app.use(helmet.frameguard({action: 'deny'}));
  app.use(
    helmet({
      originAgentCluster: true,
      crossOriginResourcePolicy: true,
      crossOriginOpenerPolicy: true,
      crossOriginEmbedderPolicy: true,
    })
  );
  app.use(
    helmet.contentSecurityPolicy({
      useDefaults: false,
      directives: {
        'frame-ancestors': ["'none'"],
        'form-action': ["'none'"],
        'upgrade-insecure-requests': [],
        'block-all-mixed-content': [],
        'default-src': ["'self'"],
        'img-src': ["'self'", 'data:'],
        'object-src': ["'none'"],
      },
    })
  );
  app.use((_req: Request, res: Response, next: NextFunction) => {
    res.setHeader('X-XSS-Protection', '1; mode=block');
    res.setHeader('Cache-Control', 'no-cache,no-store');
    res.setHeader('Pragma', 'no-cache');
    next();
  });
}

export default setHeaders;
