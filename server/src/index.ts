import { randomUUID } from "crypto";
import express from "express";
import http from "http";
import { JoinRoomPayload, MessagePayload, SocketEvent, User } from "./type";
import timestamp from "./util/timestamp";
import { Socket } from "socket.io";
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

let roomIds: String[] = [];
let users: User[] = [];

io.on(SocketEvent.Connection, (socket: Socket) => {
  console.log(timestamp(`${socket.id} established connection`));

  socket.on(SocketEvent.CreateRoom, () => {
    const roomId = randomUUID();
    roomIds.push(roomId);
    console.log(timestamp(`${roomId} Created By ${socket.id}`));
    socket.emit(SocketEvent.CreateRoom, roomId);
  });

  socket.on(SocketEvent.JoinRoom, ({ roomId, userName }: JoinRoomPayload) => {
    socket.join(roomId);
    const user: User = {
      userName,
      roomId,
      userId: socket.id,
    };
    users.push(user);
    console.log(
      timestamp(`${userName} with id ${socket.id} Joined Room ${roomId}`)
    );
  });

  socket.on(SocketEvent.Message, (payload: MessagePayload) => {
    console.log(payload.content);
  });

  socket.on(SocketEvent.Disconnect, () => {
    users = users.filter((user) => user.userId !== socket.id);
    console.log(timestamp(`${socket.id} disconnect`));
  });
});

const PORT = process.env.PORT || 8000;

server.listen(PORT, () =>
  console.log(`Socket.io server running on port ${PORT}`)
);
