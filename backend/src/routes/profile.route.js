import { Router } from "express";
import { profileController } from "../controllers/index.js";

const router = Router();

router.get("/", profileController.getProfiles);

router.post("/", profileController.createProfile);

router.put("/:id", profileController.updateProfile);

router.delete("/:id", profileController.deleteProfile);

export default router;