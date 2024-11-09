import {Router} from 'express';
import productsRouter from './products.route.js';
import categoryRouter from './category.route.js';
import roleRouter from './role.route.js';
import authRouter from './auth.route.js';

const router = Router();

const routes = [
    {
        path: '/products',
        route: productsRouter
    },
    {
        path: '/categories',
        route: categoryRouter
    },
    {
        path: '/role',
        route: roleRouter
    },
    {
        path: '/auth',
        route: authRouter
    }

];

routes.forEach(route => {
    router.use(route.path, route.route);
    });

export default router;