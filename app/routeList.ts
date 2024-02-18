import routes from './routes/routes';
import expressListRoutes from 'express-list-routes';

expressListRoutes(routes, {
  prefix: '/api',
  color: true,
});
