import { randomUUID } from "crypto";
import express from "express";
import http from "http";
import path from "path";
import { JoinRoomPayload, Message, SocketEvent, User } from "./type";
import { botSay, timestamp } from "./util/message-helper";
import { Socket } from "socket.io";
const socket = require("socket.io");

// I genuiently don't get the following shit
const app = express();

const SERVER_DIR = process.env.SERVER_DIR || "server/src";
const CLINET_BUILD_DIR = process.env.BUILD_DIR || "client/build";
const staticBuild = __dirname.replace(SERVER_DIR, CLINET_BUILD_DIR);

console.log(timestamp(`Using build path ${staticBuild}`));
app.use(express.static(staticBuild));

const server = http.createServer(app);
const io = socket(server, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"],
  },
});

let roomsId: string[] = [];
let users: User[] = [];

io.on(SocketEvent.Connection, (socket: Socket) => {
  let thisRoomId: string;
  let thisUser: User;

  console.log(timestamp(`${socket.id} established connection`));

  socket.on(SocketEvent.CreateRoom, (userName: string) => {
    const roomId = randomUUID();
    socket.join(roomId);
    thisRoomId = roomId;
    roomsId.push(thisRoomId);

    thisUser = { userId: socket.id, userName, roomId };
    users.push(thisUser);

    console.log(
      timestamp(
        `(On ${SocketEvent.CreateRoom} Event) Room id ${roomId} is created by ${userName}`
      )
    );

    socket.emit(
      SocketEvent.Message,
      botSay(`Welcome to the lobby ${userName}`)
    );
    socket.emit(SocketEvent.CreateRoom, thisRoomId);
  });

  socket.on(SocketEvent.JoinRoom, ({ roomId, userName }: JoinRoomPayload) => {
    socket.join(roomId);

    thisRoomId = roomId;
    thisUser = {
      userName,
      roomId,
      userId: socket.id,
    };

    users.push(thisUser);

    console.log(
      timestamp(
        `[On ${SocketEvent.JoinRoom} Event] ${thisUser.userName} with id ${thisUser.userId} Joined Room ${thisUser.roomId}`
      )
    );

    socket.emit(
      SocketEvent.Message,
      botSay(`Welcome to the lobby ${thisUser.userName} !`)
    );

    socket
      .to(thisUser.roomId)
      .emit(SocketEvent.Message, botSay(`${thisUser.userName} joined lobby`));
  });

  socket.on(SocketEvent.Message, (payload: Message) => {
    console.log(
      timestamp(
        `[On ${SocketEvent.Message} Event] Message：“${payload.content}” recevied by ${thisUser.userName}`
      )
    );

    io.in(thisRoomId).emit(SocketEvent.Message, payload);
  });

  socket.on(SocketEvent.Disconnect, () => {
    users = users.filter((user) => {
      if (user.userId !== socket.id) {
        console.log(
          timestamp(
            `[On ${SocketEvent.Disconnect} Event] ${socket.id} disconnect from room ${thisRoomId}`
          )
        );

        socket
          .to(thisRoomId)
          .emit(SocketEvent.Message, botSay(`${user.userName} left lobby`));

        return false;
      } else {
        return true;
      }
    });
  });
});

const PORT = process.env.PORT || 8000;

server.listen(PORT, () =>
  console.log(timestamp(`Socket.io server running on port ${PORT}`))
);
