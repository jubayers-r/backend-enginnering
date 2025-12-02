import express from "express";
import { todoController } from "./todo.controller.js";

const router = express.Router();

router.get("/", todoController.findAll);

router.post("/", todoController.create);

export const todoRoutes = router;
