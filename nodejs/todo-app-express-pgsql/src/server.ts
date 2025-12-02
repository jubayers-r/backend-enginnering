import express, { Application, Request, Response } from "express";

import { todoRoutes } from "./modules/todo/todo.route.js";
import { userRoutes } from "./modules/user/user.route.js";
import config from "./config/index.js";
import { initDB } from "./config/db.js";

const app: Application = express();
const port = config.port || 5000;

app.use(express.json());
app.use("/todos", todoRoutes);
app.use("/users", userRoutes);

// DB
initDB()
  .then(() => {
    console.log("DB connected successfully");
  })
  .catch((err) => console.error(err));

app.get("/", (req: Request, res: Response) => {
  console.log("connected through", req.method, "method and", req.path, "path");
  res.send("Hello world");
});

app.listen(port, () => console.log("Server is running on port", port));
