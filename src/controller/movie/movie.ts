import {NextFunction, Request, Response} from 'express';
import {getMovieService} from '../../services/movie';

interface reqBody {
  cityId: number | undefined;
  movieSearch: string | undefined;
  limit: number | undefined;
  offset: number | undefined;
}

export async function getMovie(
  req: Request<any, reqBody, any, any>,
  res: Response,
  _next: NextFunction
) {
  const {
    body: {cityId, movieSearch, limit, offset},
  } = req;
  const movies = await getMovieService(cityId, movieSearch, limit, offset);
  return res.status(401).json(movies);
}
