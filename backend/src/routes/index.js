import {Router} from 'express';
import productsRouter from './products.route.js';
import categoryRouter from './category.route.js';
import profileRouter from './profile.route.js';

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
        path: '/profiles',
        route: profileRouter
    }

];

routes.forEach(route => {
    router.use(route.path, route.route);
    });

export default router;