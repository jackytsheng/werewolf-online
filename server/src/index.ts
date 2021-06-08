import express from "express";
import http from "http";
const socket = require("socket.io");

// I genuiently don't get the following shit
const app = express();
const server = http.createServer(app);
const io = socket(server, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"],
  },
});

io.on("connection", (socket: any) => {
  console.log("some connection established");
});

const PORT = process.env.PORT || 8000;

server.listen(PORT, () =>
  console.log(`Socket.io server running on port ${PORT}`)
);
