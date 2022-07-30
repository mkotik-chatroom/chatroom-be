const express = require("express");
const cors = require("cors");
const app = express();
const http = require("http");
const server = http.createServer(app);
const io = require("socket.io")(server, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"],
    extraHeaders: {
      "Access-Control-Allow-Credentials": "true",
    },
  },
});

io.on("connection", (socket) => {
  console.log("a user connected");
  socket.on("disconnect", () => {
    socket.removeAllListeners();
  });

  console.log(socket);

  socket.on(
    "message",
    ({ name, message }: { name: string; message: string }) => {
      io.emit("message", { name, message });
    }
  );
});

server.listen(5050, () => {
  console.log("listening on *:5050");
});
