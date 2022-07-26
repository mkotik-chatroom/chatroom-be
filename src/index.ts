const express = require("express");
const cors = require("cors");
const app = express();
const http = require("http");
const server = http.createServer(app);
const port = process.env.PORT || 8000;
const io = require("socket.io")(server, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"],
    extraHeaders: {
      "Access-Control-Allow-Credentials": "true",
    },
  },
});

app.get("/", (req, res) => {
  res.send("server works really really well!");
});

io.on("connection", (socket) => {
  console.log("a user connected");
  socket.on("disconnect", () => {
    socket.removeAllListeners();
  });

  socket.on(
    "message",
    ({ name, message }: { name: string; message: string }) => {
      io.emit("message", { name, message });
    }
  );

  socket.on("typing", () => {
    socket.broadcast.emit("typing");
  });
});

server.listen(port, () => {
  console.log(`listening on port ${port}`);
});
