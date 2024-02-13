import { validate } from "uuid";
import { IncomingMessage, ServerResponse } from "http";
import { v4 as uuidv4 } from "uuid";

import { ICustomIncomingMessage, IUser } from "./types/types";
import { bodyParser } from "./utils/body-parser";
import { fileWriter } from "./utils/file-writer";

export const handleGet = (
  req: ICustomIncomingMessage,
  res: ServerResponse<IncomingMessage> & { req: IncomingMessage }
) => {
  const baseUrl = req.url.substring(0, req.url.lastIndexOf("/") + 1);
  const id = req.url.split("/")[3];
  const isIdCorrect = validate(id);
  switch (true) {
    default:
      res.writeHead(404, { "Content-Type": "application/json" });
      if (!isIdCorrect && baseUrl === "/api/users/") {
        res.end(
          JSON.stringify({ title: "Not Found", message: "UserId is invalid" })
        );
      } else {
        res.end(
          JSON.stringify({ title: "Not Found", message: "Route not found" })
        );
      }

      break;

    case req.url === "/api/users":
      res.statusCode = 200;
      res.setHeader("Content-type", "application/json");
      res.write(JSON.stringify(req.users));
      res.end();
      break;

    case baseUrl === "/api/users/" && isIdCorrect:
      res.statusCode = 200;
      res.setHeader("Content-type", "application/json");
      let filteredUsers = req.users.filter((user) => {
        return user.id === id;
      });

      if (filteredUsers.length > 0) {
        res.statusCode = 200;
        res.write(JSON.stringify(filteredUsers));
        res.end();
      } else {
        res.statusCode = 404;
        res.end(
          JSON.stringify({
            title: "Not Found",
            message: "User with such UserId does not exist",
          })
        );
      }
      break;
  }
};

export const handlePost = async (
  req: ICustomIncomingMessage,
  res: ServerResponse<IncomingMessage> & { req: IncomingMessage }
) => {
  if (req.url === "/api/users") {
    try {
      let body = (await bodyParser(req)) as IUser;

      if (!body.age || !body.hobbies || !body.username) throw "Invalid body";

      body.id = uuidv4();
      req.users.push(body);
      await fileWriter(req.users);
      res.writeHead(201, { "Content-Type": "application/json" });
      res.end();
    } catch (err) {
      res.writeHead(400, { "Content-Type": "application/json" });
      res.end(
        JSON.stringify({
          title: "Validation failed",
          message: "Request body is invalid",
        })
      );
    }
  } else {
    res.statusCode = 404;
    res.end(
      JSON.stringify({
        title: "Not Found",
        message: "Route not found",
      })
    );
  }
};

export const handlePut = async (
  req: ICustomIncomingMessage,
  res: ServerResponse<IncomingMessage> & { req: IncomingMessage }
) => {
  const baseUrl = req.url.substring(0, req.url.lastIndexOf("/") + 1);
  const id = req.url.split("/")[3];
  const isIdCorrect = validate(id);
  switch (true) {
    default:
      res.writeHead(404, { "Content-Type": "application/json" });
      if (!isIdCorrect && baseUrl === "/api/users/") {
        res.end(
          JSON.stringify({ title: "Not Found", message: "UserId is invalid" })
        );
      } else {
        res.end(
          JSON.stringify({ title: "Not Found", message: "Route not found" })
        );
      }
      break;

    case req.url === "/api/users":
      res.statusCode = 200;
      res.setHeader("Content-type", "application/json");
      res.write(JSON.stringify(req.users));
      res.end();
      break;

    case baseUrl === "/api/users/" && isIdCorrect:
      try {
        let body = (await bodyParser(req)) as IUser;
        const index = req.users.findIndex((user) => {
          return user.id === id;
        });

        if (index === -1) {
          res.writeHead(404, { "Content-Type": "application/json" });
          res.end(
            JSON.stringify({
              title: "Not Found",
              message: "User with such ID does not exist",
            })
          );
        } else {
          req.users[index] = { id, ...body };
          fileWriter(req.users);
          res.writeHead(200, { "Content-Type": "application/json" });
          res.end(JSON.stringify(req.users));
        }
      } catch (err) {
        res.writeHead(400, { "Content-Type": "application/json" });
        res.end(
          JSON.stringify({
            title: "Validation failed",
            message: "Request body is invalid",
          })
        );
      }
      break;
  }
};

export const handleDelete = (
  req: ICustomIncomingMessage,
  res: ServerResponse<IncomingMessage> & { req: IncomingMessage }
) => {
  const baseUrl = req.url.substring(0, req.url.lastIndexOf("/") + 1);
  const id = req.url.split("/")[3];
  const isIdCorrect = validate(id);
  console.log(baseUrl);
  switch (true) {
    default:
      res.writeHead(404, { "Content-Type": "application/json" });
      if (!isIdCorrect && baseUrl === "/api/users/") {
        res.end(
          JSON.stringify({ title: "Not Found", message: "UserId is invalid" })
        );
      } else {
        res.end(
          JSON.stringify({ title: "Not Found", message: "Route not found" })
        );
      }
      break;

    case baseUrl === "/api/users/" && isIdCorrect:
      const index = req.users.findIndex((user) => {
        return user.id === id;
      });

      if (index === -1) {
        res.writeHead(404, { "Content-Type": "application/json" });
        res.end(
          JSON.stringify({
            title: "Not Found",
            message: "No user with such id",
          })
        );
      } else {
        req.users.splice(index, 1);
        fileWriter(req.users);
        res.writeHead(204, { "Content-Type": "application/json" });
        res.end(JSON.stringify(req.users));
      }

      break;
  }
};

export const notFound = (
  req: ICustomIncomingMessage,
  res: ServerResponse<IncomingMessage> & { req: IncomingMessage }
) => {
  res.statusCode = 404;
  res.setHeader("Content-Type", "application/json");
  res.write(
    JSON.stringify({ title: "Not found..", message: "Route not found!" })
  );
  res.end();
};
