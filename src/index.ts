const express = require("express");
const cors = require("cors");
const server = express();

const port = process.env.PORT || 8000;

server.use(cors());

server.get("/", (req, res) => {
  res.send("Server works!");
});

server.listen(port, () => {
  console.log(`server listening on port ${port}`);
});
