import parseBody from "../helpers/parseBody";
import addRoutes from "../helpers/RouteHander";
import sendJson from "../helpers/sendJson";

addRoutes("GET", "/", (req, res) => {
  sendJson(res, 200, {
    sucess: true,
    message: "Hello from typescipt nodejs",
    path: req.url,
  });
});

addRoutes("POST", "/api/users", async (req, res) => {
  const body = await parseBody(req);
  sendJson(res, 201, {
    success: true,
    data: body,
  });
});
