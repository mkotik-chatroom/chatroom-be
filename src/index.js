var express = require("express");
var cors = require("cors");
var app = express();
var http = require("http");
var server = http.createServer(app);
var port = process.env.PORT || 8000;
var io = require("socket.io")(server, {
    cors: {
        origin: "*",
        methods: ["GET", "POST"],
        extraHeaders: {
            "Access-Control-Allow-Credentials": "true"
        }
    }
});
app.get("/", function (req, res) {
    res.send("server works really well!");
});
io.on("connection", function (socket) {
    console.log("a user connected");
    socket.on("disconnect", function () {
        socket.removeAllListeners();
    });
    socket.on("message", function (_a) {
        var name = _a.name, message = _a.message;
        io.emit("message", { name: name, message: message });
    });
    socket.on("typing", function () {
        socket.broadcast.emit("typing");
    });
});
server.listen(port, function () {
    console.log("listening on port ".concat(port));
});
