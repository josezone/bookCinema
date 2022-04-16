import {NextFunction, Request, Response} from 'express';
import {getCityService} from '../../services/city';

interface reqQuery {
    citySearch: string | undefined;
    limit: number | undefined;
    offset: number | undefined;
}

export async function getCity(
  req: Request<any, any, any, reqQuery>,
  res: Response,
  _next: NextFunction
) {
  const {
    query: {citySearch, limit, offset},
  } = req;
  const city = await getCityService(citySearch, limit, offset);
  return res.status(401).json(city);
}
