import { Router } from "express";
import { todoController } from "./todo.controller.js";

const router = Router({ mergeParams: true });

router.get("/", todoController.findAll);

router.post("/", todoController.create);

export const todoRoutes = router;
