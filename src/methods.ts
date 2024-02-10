import { IncomingMessage, ServerResponse } from "http";

export const handleGet = (
  req: IncomingMessage,
  res: ServerResponse<IncomingMessage> & { req: IncomingMessage }
) => {};

export const handlePost = (
  req: IncomingMessage,
  res: ServerResponse<IncomingMessage> & { req: IncomingMessage }
) => {};

export const handlePut = (
  req: IncomingMessage,
  res: ServerResponse<IncomingMessage> & { req: IncomingMessage }
) => {};

export const handleDelete = (
  req: IncomingMessage,
  res: ServerResponse<IncomingMessage> & { req: IncomingMessage }
) => {};

export const notFound = (
  req: IncomingMessage,
  res: ServerResponse<IncomingMessage> & { req: IncomingMessage }
) => {
  res.statusCode = 404;
  res.setHeader("Content-Type", "application/json");
  res.write(
    JSON.stringify({ title: "Not found..", message: "Route not found!" })
  );
  res.end();
};
