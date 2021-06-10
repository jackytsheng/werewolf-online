import express from "express";
import http from "http";
import { MessagePayload } from "./type";
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

  socket.on("joinRoom", () => {
    console.log("New Join" + new Date().toLocaleDateString());
  });

  socket.on("message", (payload: MessagePayload) => {
    console.log(payload.content);
  });
});

const PORT = process.env.PORT || 8000;

server.listen(PORT, () =>
  console.log(`Socket.io server running on port ${PORT}`)
);
