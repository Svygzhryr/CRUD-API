import * as http from "http";
import { handleGet, handleDelete, handlePost, handlePut } from "./methods";

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
  }

  res.statusCode = 200;
  res.setHeader("Content-Type", "application/json");
  res.write(JSON.stringify({ message: "Greetings from server!" }));
  res.end();
});

server.listen(port, () => {
  console.log(`Server started on port ${port}!`);
});
