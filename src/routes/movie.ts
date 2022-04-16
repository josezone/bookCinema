import {Router} from 'express';
import { getMovie } from '../controller/movie/movie';

const router: Router = Router();
export function movieRoutes() {
  router.get('/', getMovie)
  return router;
}

export default movieRoutes;
