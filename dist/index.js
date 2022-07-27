const express = require("express");
const cors = require("cors");
const server = express();
const port = process.env.PORT || 8000;

server.use(cors());
server.get("/", (req, res) => {
  res.send("Server works!");
});

server.get("/test", (req, res) => {
  res.send(port.toString());
});
server.listen(port, () => {
  console.log(`server listening on port ${port}`);
});
//# sourceMappingURL=index.js.map
