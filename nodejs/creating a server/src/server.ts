import http, { IncomingMessage, Server, ServerResponse } from "http";
import config from "./config";

const server: Server = http.createServer(
  (req: IncomingMessage, res: ServerResponse) => {
    console.log("server is running");

    //root route
    if (req.url === "/" && req.method === "GET") {
      res.writeHead(200, { "content-type": "application/json" });
      res.end(
        JSON.stringify({
          message: "Hello from nodejs with typescript",
          path: req.url,
        })
      );
    }

    // /api route
    if (req.url === "/api" && req.method === "GET") {
      res.writeHead(200, { "content-type": "application/json" });
      res.end(
        JSON.stringify({
          message: "Hello from /api",
          path: req.url,
        })
      );
    }

    // post route
    if (req.url === "/api/users" && req.method === "POST") {
      // console.log(req.method, req.url);
      // res.writeHead(200, { "content-type": "application/json" });
      const user = {
        id: 1,
        name: "alice",
      };
      let body = "";
      // listen data chunk
      req.on("data", (chunk) => {
        console.log(chunk);
        body += chunk.toString();
      });

      req.on("end", () => {
       try {
         const parsedBody = JSON.parse(body);
        console.log(parsedBody);
        res.end(JSON.stringify(parsedBody));
       } catch (error: any) {
        console.log(error.message);
       }
      });
    }

  }
);

server.listen(config.port, () => {
  console.log("server is running from port 5000");
});
