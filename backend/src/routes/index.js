import {Router} from 'express';
import productsRouter from './products.route.js';
const router = Router();

const routes = [
    {
        path: '/products',
        route: productsRouter
    }
];

routes.forEach(route => {
    router.use(route.path, route.route);
    });

export default router;