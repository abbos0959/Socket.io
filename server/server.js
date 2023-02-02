const express = require("express");
const app = express();
const http = require("http");
const { Server } = require("socket.io");
const cors = require("cors");
const { log } = require("console");

app.use(cors());

const server = http.createServer(app);
const io = new Server(server, {
   cors: { origin: "http://localhost:3000", methods: ["GET", "POST"] },
});





io.on("connection", function (socket) {
   console.log("socket connect", socket.id);

   socket.on("join_room", (data) => {
      socket.join(data);
      console.log("user id", socket.id, "room id", data);
   });
   socket.on("send_message", (data) => {
      socket.to(data.chat).emit("receive_message", data);
      console.log(data);
   });
   socket.on("disconnect", function () {
      console.log("socket disconnected", socket.id);
   });
});




server.listen(3001, () => {
   console.log("server ishladi");
});
