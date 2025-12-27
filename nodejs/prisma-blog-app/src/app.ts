import express, { Application, Request, Response } from "express";
import { postRouter } from "./post/post.route";

const app: Application = express();

app.use(express.json());
app.use("/posts", postRouter);

app.get("/", (req: Request, res: Response) => {
  res.send("Hellow world");
});

export default app;
