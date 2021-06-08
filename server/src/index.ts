import express from "express";
import cors from "cors";
import http from "http";
const socket = require("socket.io");

// I genuiently don't get the following shit
const app = express();
app.use(cors());
const server = http.createServer(app);
const io = socket(server);

io.on("connection", (socket: any) => {
  socket.on("joinRoom", ({}) => {
    console.log("new user join room");
  });
});

const PORT = process.env.PORT || 8000;

server.listen(PORT, () =>
  console.log(`Socket.io server running on port ${PORT}`)
);
