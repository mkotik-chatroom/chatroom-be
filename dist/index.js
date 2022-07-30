const express = require("express");
const cors = require("cors");
const app = express();
const http = require("http");
const server = http.createServer(app);
const io = require("socket.io")(server, {
    cors: true,
    origins: ["http://localhost:3000", "http://localhost:3001"],
});
app.use(cors());
server.use(cors());
io.on("connection", (socket) => {
    console.log("a user connected");
    socket.on("disconnect", () => {
        console.log("user disconnected");
    });
    socket.on("message", ({ name, message }) => {
        // console.log(msg);
        // socket.broadcast.emit("message", { name, message });
        io.emit("message", { name, message });
    });
});
server.listen(5050, () => {
    console.log("listening on *:5050");
});
//# sourceMappingURL=index.js.map