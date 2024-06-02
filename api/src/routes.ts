
import { Routes } from '@scloud/lambda-api/dist/types';
import { ping } from './routes/ping';
import list from './routes/list';
import search from './routes/search';
import get from './routes/get';

const routes: Routes = {
  '/api/ping': { GET: ping },
  '/api/list': { GET: list },
  '/api/search': { GET: search },
  '/api/plant': { GET: get },
};

export default routes;
