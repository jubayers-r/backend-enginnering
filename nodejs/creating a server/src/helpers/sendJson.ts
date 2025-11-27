import { IncomingMessage, ServerResponse } from "http";
import addRoutes from "./RouteHander";

const sendJson = (
  method: string,
  path: string,
  statusCode: number,
  data: any
) => {
  addRoutes(method, path, (req: IncomingMessage, res: ServerResponse) => {
    res.writeHead(statusCode, { "content-type": "application/json" });
    res.end(JSON.stringify(data));
  });
};

export default sendJson;
