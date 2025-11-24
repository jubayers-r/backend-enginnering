import { config } from "dotenv";
import http, { IncomingMessage, Server, ServerResponse } from "http";

const server: Server = http.createServer(
  (req: IncomingMessage, res: ServerResponse) => {
    console.log("server is running");

    res.writeHead(200, { "content-type": "application/json" });
    res.end(
      JSON.stringify({
        message: "Hello from nodejs with typescript",
        path: req.url,
      })
    );
  }
);


server.listen(5000, () => {
    console.log("server is running from port 5000")
})