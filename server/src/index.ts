import { randomUUID } from 'crypto';
import express from 'express';
import http from 'http';
import { JoinRoomPayload, Message, RoomInfo, SocketEvent, User } from './type';
import { botSay, timestamp } from './util/message-helper';
import { Socket } from 'socket.io';
const socket = require('socket.io');

// I genuiently don't get the following shit
const app = express();

// const SERVER_DIR = process.env.SERVER_DIR || 'server/src';
// const CLINET_BUILD_DIR = process.env.BUILD_DIR || 'client/build';
// const staticBuild = __dirname.replace(SERVER_DIR, CLINET_BUILD_DIR);

// console.log(timestamp(`Using build path ${staticBuild}`));
// app.use(express.static(staticBuild));

const server = http.createServer(app);
const io = socket(server, {
  cors: {
    origin: '*',
    methods: ['GET', 'POST'],
  },
});

let roomsId: string[] = [];
let users: User[] = [];

io.on(SocketEvent.Connection, (socket: Socket) => {
  let thisUser: User = {
    roomId: '',
    userId: '',
    userName: '',
  };
  let thisRoomInfo: RoomInfo = {
    users: [],
    roomId: '',
  };

  console.log(timestamp(`${socket.id} established connection`));

  const storeInfo = (roomId: string, userId: string, userName: string) => {
    thisRoomInfo.roomId = roomId;

    let user: User = {
      roomId,
      userId,
      userName,
    };

    // store this at the global level for all users
    thisUser = user;
    users.push(user);

    thisRoomInfo.users = users.filter((user) => user.roomId === roomId);
  };

  socket.on(SocketEvent.CreateRoom, (userName: string) => {
    const roomId = randomUUID();
    socket.join(roomId);
    roomsId.push(roomId);
    storeInfo(roomId, socket.id, userName);

    console.log(
      timestamp(
        `(On ${SocketEvent.CreateRoom} Event) Room id ${roomId} is created by ${userName}`
      )
    );

    socket.emit(
      SocketEvent.Message,
      botSay(`Welcome to the lobby ${userName}`)
    );
    socket.emit(SocketEvent.CreateRoom, thisRoomInfo.roomId);
    io.in(thisRoomInfo.roomId).emit(SocketEvent.RoomInfo, thisRoomInfo);
  });

  socket.on(SocketEvent.JoinRoom, ({ roomId, userName }: JoinRoomPayload) => {
    socket.join(roomId);
    storeInfo(roomId, socket.id, userName);

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
    io.in(thisRoomInfo.roomId).emit(SocketEvent.RoomInfo, thisRoomInfo);
  });

  socket.on(SocketEvent.Message, (payload: Message) => {
    console.log(
      timestamp(
        `[On ${SocketEvent.Message} Event] Message：“${payload.content}” recevied by ${thisUser.userName}`
      )
    );

    io.in(thisRoomInfo.roomId).emit(SocketEvent.Message, payload);
  });

  socket.on(SocketEvent.Disconnect, () => {
    console.log(
      timestamp(
        `[On ${SocketEvent.Disconnect} Event] ${socket.id} disconnect from room ${thisRoomInfo.roomId}`
      )
    );

    socket
      .to(thisRoomInfo.roomId)
      .emit(SocketEvent.Message, botSay(`${thisUser.userName} left lobby`));

    users = users.filter((user) => user.userId !== socket.id);
    thisRoomInfo.users = users.filter(
      (user) => user.roomId === thisRoomInfo.roomId
    );

    io.in(thisRoomInfo.roomId).emit(SocketEvent.RoomInfo, thisRoomInfo);
  });
});

const PORT = process.env.PORT || 8000;

server.listen(PORT, () =>
  console.log(timestamp(`Socket.io server running on port ${PORT}`))
);
