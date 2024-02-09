import * as http from "http";

const port = process.env.PORT || 3000;

const server = http.createServer((req, res) => {
  res.statusCode = 200;
  res.setHeader("Content-Type", "application/json");
  res.write(JSON.stringify({ message: "Greetings from the server.." }));
  res.end();
});

server.listen(port, () => {
  console.log(`Server started on port ${port}!`);
});
