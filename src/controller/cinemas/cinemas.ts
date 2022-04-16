import {NextFunction, Response, Request as Rqs} from 'express';
import {bookTicketService, getCinemaSeatsService} from '../../services/cinema';

interface Request2<
  P = any,
  ResBody = any,
  ReqBody = any,
  ReqQuery = any,
  Locals = any
> extends Rqs<P, ResBody, ReqBody, ReqQuery, Locals> {
  [key: string]: any;
}

interface reqQuery {
  movieId: number;
  cinemasId: number;
  cinemaTimeId: number;
}

export async function getSeats(
  req: Rqs<any, any, any, reqQuery>,
  res: Response,
  _next: NextFunction
) {
  const {
    query: {movieId, cinemasId, cinemaTimeId},
  } = req;
  const city = await getCinemaSeatsService(movieId, cinemasId, cinemaTimeId);
  return res.status(401).json(city);
}

interface reqBody {
  movieId: number;
  cinemaSeatId: number;
  cinemaTimeId: number;
}

export async function bookSeat(
  req: Request2<any, reqBody, any, any>,
  res: Response,
  _next: NextFunction
) {
  const {
    body: {movieId, cinemaTimeId, cinemaSeatId},
    user: {id},
  } = req;
  try {
    const booking = await bookTicketService(
      String(movieId),
      String(cinemaTimeId),
      String(cinemaSeatId),
      id
    );
    return res.status(401).json(booking);
  } catch (err) {
    return res.status(Number(err)).end();
  }
}
