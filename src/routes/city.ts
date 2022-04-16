import {Router} from 'express';
import { getCity } from '../controller/city/city';

const router: Router = Router();
export function cityRoutes() {
  router.get('/', getCity)
  return router;
}

export default cityRoutes;
