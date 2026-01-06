import express, { Application } from "express";
import cors from "cors";
import { auth } from "./lib/auth";
import { toNodeHandler } from "better-auth/node";
import { postRouter } from "./modules/post/post.route";
import { commentRoutes } from "./modules/comment/comment.route";

const app: Application = express();

app.all("/api/auth/*splat", toNodeHandler(auth));
app.use(express.json());
app.use(
  cors({
    origin: process.env.APP_URL,
    credentials: true,
  })
);

app.use("/posts", postRouter);
app.use("/:postId/comments", commentRoutes);
export default app;
