import {whitelist} from '../config/serverConfig';

export function corsOptions(
  origin: string | undefined,
  callback: (
    err: Error | null,
    origin?: boolean | string | RegExp | (string | RegExp)[]
  ) => void
) {
  if (!origin || whitelist.indexOf(origin as string) !== -1) {
    callback(null, true);
  } else {
    callback(new Error('Not allowed by CORS'));
  }
}

export default corsOptions;
