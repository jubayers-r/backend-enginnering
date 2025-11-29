import express, { Request, Response } from "express";

const app = express();

const port = 5000;

// parser
app.use(express.json());

app.get("/", (req: Request, res: Response) => {
  res.send("Hello world damn son");
});

app.post("/", (req: Request, res: Response) => {
  console.log(req.body);

  res.status(201).json({
    success: true,
    message: "API is Working",
  });
});

app.listen(port, () => {
  console.log("server is running bruh");
});
