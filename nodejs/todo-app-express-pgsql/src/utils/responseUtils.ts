import { Response } from "express";

const success = (res: Response, data: any, message = "Success") =>
  res.status(200).json({ success: true, message, data });

const created = (res: Response, data: any, message = "Resource created") =>
  res.status(201).json({ success: true, message, data });

const accepted = (res: Response, data: any, message = "Accepted") =>
  res.status(202).json({ success: true, message, data });

const noContent = (res: Response) =>
  res.status(204).send();


// ------------------------------
// ❌ CLIENT ERRORS
// ------------------------------

const badRequest = (res: Response, message = "Bad Request") =>
  res.status(400).json({ success: false, message });

const unauthorized = (res: Response, message = "Unauthorized") =>
  res.status(401).json({ success: false, message });

const forbidden = (res: Response, message = "Forbidden") =>
  res.status(403).json({ success: false, message });

const notFound = (res: Response, resource = "Resource") =>
  res.status(404).json({ success: false, message: `${resource} not found` });

const conflict = (res: Response, message = "Conflict") =>
  res.status(409).json({ success: false, message });

const unprocessable = (res: Response, message = "Unprocessable entity") =>
  res.status(422).json({ success: false, message });

const tooManyRequests = (res: Response, message = "Too many requests") =>
  res.status(429).json({ success: false, message });


// ------------------------------
// 💥 SERVER ERRORS
// ------------------------------

const internalError = (res: Response, err: any = null) =>
  res.status(500).json({
    success: false,
    message: "Internal Server Error",
    error: err?.message,
  });

const notImplemented = (res: Response, message = "Not implemented") =>
  res.status(501).json({ success: false, message });

const badGateway = (res: Response, message = "Bad Gateway") =>
  res.status(502).json({ success: false, message });

const serviceUnavailable = (res: Response, message = "Service unavailable") =>
  res.status(503).json({ success: false, message });

const gatewayTimeout = (res: Response, message = "Gateway timeout") =>
  res.status(504).json({ success: false, message });


// ------------------------------
// Export all in one object (optional)
// ------------------------------

export {
  success,
  created,
  accepted,
  noContent,

  badRequest,
  unauthorized,
  forbidden,
  notFound,
  conflict,
  unprocessable,
  tooManyRequests,

  internalError,
  notImplemented,
  badGateway,
  serviceUnavailable,
  gatewayTimeout,
};
