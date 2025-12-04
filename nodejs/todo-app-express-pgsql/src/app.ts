import express, {
  Application,
  Request,
  Response,
  Router,
} from "express";
import { todoRoutes } from "./modules/todo/todo.route.js";
import { userRoutes } from "./modules/user/user.route.js";
import { initDB } from "./config/db.js";
import { authRoutes } from "./modules/auth/auth.route.js";
import { notFound } from "./utils/responseUtils.js";

const app: Application = express();

const apiV1 = Router();

app.use(express.json());
app.use("/api/v1", apiV1);

apiV1.use("/users/:user_id/todos", todoRoutes);
apiV1.use("/users", userRoutes);
apiV1.use("/auth", authRoutes);

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

app.use((_req, res) => {
  notFound(res, "route not found");
});

export default app;
