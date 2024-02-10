import * as http from "http";
import {
  handleGet,
  handleDelete,
  handlePost,
  handlePut,
  notFound,
} from "./methods.ts";

const port = process.env.PORT || 3000;

const server = http.createServer((req, res) => {
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
