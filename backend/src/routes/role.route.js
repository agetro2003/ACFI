import { Router } from "express";
import { roleController } from "../controllers/index.js";
import {checkAuth} from '../middlewares/index.js';

const router = Router();

router.get("/", checkAuth(['admin']), roleController.getRoles);

router.post("/", checkAuth(['admin']), roleController.createRole);

router.put("/:id", checkAuth(['admin']), roleController.updateRole);

router.delete("/:id", checkAuth(['admin']), roleController.deleteRole);

export default router;