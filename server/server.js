const express = require("express");
const app = express();
const http = require("http");
const { Server } = require("socket.io");
const cors = require("cors");
const { log } = require("console");

app.use(cors());

const server = http.createServer(app);
const io = new Server({
   cors: { origin: "http://localhost:3000", methods: ["GET", "POST"] },
});
io.on("connecttion", function (socket) {
   console.log(socket.id);
   socket.on("disconnect", function () {
      console.log("socket disconnected", socket.id);
   });
});

server.listen(3001, () => {
   console.log("server ishladi");
});
