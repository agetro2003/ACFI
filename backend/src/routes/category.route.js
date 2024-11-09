import { Router } from "express";
import { categoryController } from "../controllers/index.js";
import {checkAuth} from '../middlewares/index.js';

const router = Router();

router.get("/", categoryController.getCategories);

router.post("/",  checkAuth(['admin']), categoryController.createCategory);

router.put("/:id",  checkAuth(['admin']), categoryController.updateCategory);

router.delete("/:id",  checkAuth(['admin']), categoryController.deleteCategory);

export default router;