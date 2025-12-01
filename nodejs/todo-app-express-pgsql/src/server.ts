import express, { Application, Request, Response } from "express";
import { initDB } from "./db.js";
import todosRoutes from "./routes/todos.js";
import usersRoutes from "./routes/users.js";

const app: Application = express();
const port = process.env.PORT || 5000;

app.use(express.json());
app.use("/todos", todosRoutes);
app.use("/users", usersRoutes);

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
