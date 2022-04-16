import {Request, Response} from 'express';

export function healthCheck(_req: Request, res: Response) {
  res.status(200).json({
    timeZone: new Date().toISOString(),
    code: 200,
    message: 'success',
  });
}

export default healthCheck;
