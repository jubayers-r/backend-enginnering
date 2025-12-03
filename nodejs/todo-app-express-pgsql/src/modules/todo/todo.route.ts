import { Router } from "express";
import { todoController } from "./todo.controller.js";
import auth from "../../middleware/auth.js";

const router = Router({ mergeParams: true });

router.get("/", auth, todoController.findAll);

router.post("/", todoController.create);

export const todoRoutes = router;
