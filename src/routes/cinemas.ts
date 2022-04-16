import {Router} from 'express';
import {bookSeat, getSeats} from '../controller/cinemas/cinemas';
import verifyUser from '../middlewares/verify-user';

const router: Router = Router();
export function cinemaRoutes() {
  router.get('/seats', getSeats);
  router.post('/seats', verifyUser, bookSeat);
  return router;
}

export default cinemaRoutes;
