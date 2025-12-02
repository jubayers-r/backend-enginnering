import express from "express";
import { todoController } from "./todo.controller.js";

const router = express.Router();

router.get("/:user_id", todoController.findAllByUserId);

router.post("/:user_id", todoController.createByUserId);

export const todoRoutes = router;
