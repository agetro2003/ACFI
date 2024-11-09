import { Router } from 'express';
import { productController } from '../controllers/index.js';
import {checkAuth} from '../middlewares/index.js';

const router = Router();


router.get('/', productController.getProducts);

router.post('/', checkAuth(['admin']), productController.createProduct);

router.put('/:id', checkAuth(['admin']), productController.updateProduct);

router.delete('/:id', checkAuth(['admin']), productController.deleteProduct);

export default router;