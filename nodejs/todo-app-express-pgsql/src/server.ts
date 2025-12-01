import express, { Request, Response } from "express";
import dotenv from "dotenv";
import path from "path";

const app = express();
const port = 5000;

app.use(express.json());
dotenv.config({ path: path.join(process.cwd(), ".env") });


app.get("/", (req: Request, res: Response) => {
  console.log("connected through", req.method, "method and", req.path, "path");
  res.send("Hello world");
});

app.listen(port, () => console.log("Server is running on port", port));
