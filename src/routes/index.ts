import {Router} from 'express';
import healthCheck from '../controller/health-check/health-check';
import {createUser, login} from '../controller/users/users';
import cinemaRoutes from './cinemas';
import cityRoutes from './city';
import movieRoutes from './movie';

const router: Router = Router();
export function routes() {
  router.get('/health-check', healthCheck);
  router.post('/create-user', createUser);
  router.post('/login', login);
  router.use('/city', cityRoutes());
  router.use('/movies', movieRoutes());
  router.use('/cinemas', cinemaRoutes());
  return router;
}

export default routes;
