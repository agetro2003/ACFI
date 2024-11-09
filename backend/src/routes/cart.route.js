import { Router } from "express";
import { cartController } from "../controllers/index.js";
import {checkAuth} from '../middlewares/index.js';

const router = Router();

router.get("/", checkAuth(['admin', 'customer']), cartController.getCart);

router.post("/", checkAuth(['admin', 'customer']), cartController.addToCart);

router.put("/", checkAuth(['admin', 'customer']), cartController.updateCart);

router.delete("/", checkAuth(['admin', 'customer']), cartController.removeFromCart);

router.delete("/clear", checkAuth(['admin', 'customer']), cartController.clearCart);

export default router;