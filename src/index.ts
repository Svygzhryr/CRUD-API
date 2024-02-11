import * as http from "http";

import {
  handleGet,
  handleDelete,
  handlePost,
  handlePut,
  notFound,
} from "./methods.ts";
import users from "./users.json";
import { ICustomIncomingMessage } from "./types/types.ts";

const port = process.env.PORT || 3000;

const server = http.createServer((req: ICustomIncomingMessage, res) => {
  req.users = users;
  switch (req.method) {
    case "GET":
      handleGet(req, res);
      break;
    case "POST":
      handlePost(req, res);
      break;
    case "PUT":
      handlePut(req, res);
      break;
    case "DELETE":
      handleDelete(req, res);
      break;
    default:
      notFound(req, res);
      break;
  }
});

server.listen(port, () => {
  console.log(`Server started on port ${port}!`);
});
