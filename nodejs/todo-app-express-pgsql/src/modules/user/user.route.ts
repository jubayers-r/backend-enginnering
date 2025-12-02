import express from "express";
import { userController } from "./user.controller.js";
const router = express.Router();

router.get("/", userController.findAll);

router.get("/:id", userController.findOne);

router.post("/", userController.create);

export const userRoutes = router;
