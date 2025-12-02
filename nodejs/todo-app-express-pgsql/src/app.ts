import express, { Application, Request, Response } from "express";
import { todoRoutes } from "./modules/todo/todo.route.js";
import { userRoutes } from "./modules/user/user.route.js";
import { initDB } from "./config/db.js";
import { authRoutes } from "./modules/auth/auth.route.js";

const app: Application = express();

app.use(express.json());
app.use("/users/:user_id/todos", todoRoutes);
app.use("/users", userRoutes);
app.use("/auth", authRoutes);

// initialize DB
initDB()
  .then(() => {
    console.log("DB connected successfully");
  })
  .catch((err) => console.error(err));

app.get("/", (req: Request, res: Response) => {
  console.log("connected through", req.method, "method and", req.path, "path");
  res.send("Hello world");
});

export default app;
