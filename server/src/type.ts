export type MessagePayload = {
  content: string;
  userId: string;
  date: Date;
};

export enum SocketEvent {
  Message = "message",
  JoinRoom = "joinRoom",
  CreateRoom = "createRoom",
  Connection = "connection",
  Disconnect = "disconnect",
}

export type User = {
  roomId: string;
  userId: string;
  userName: string;
};

export type JoinRoomPayload = {
  roomId: string;
  userName: string;
};
