import http, { IncomingMessage, Server, ServerResponse } from "http";
import config from "./config";
import { RouteHandler, routes } from "./helpers/RouteHander";
import "./routes";

const server: Server = http.createServer(
  (req: IncomingMessage, res: ServerResponse) => {
    console.log("server is running");

    const path = req.url || "";
    const method = req.method?.toUpperCase() || "";

    const methodMap = routes.get(method);
    const handler: RouteHandler | undefined = methodMap?.get(path);

    if (handler) {
      handler(req, res);
    } else {
      res.writeHead(404, { "content-type": "application/json" });

      res.end(
        JSON.stringify({
          success: false,
          message: "Route not found",
          path,
        })
      );
    }
  }
);

server.listen(config.port, () => {
  console.log("server is running from port 5000");
});
