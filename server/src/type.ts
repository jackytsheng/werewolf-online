export type MessagePayload = {
  content: String;
  userId: String;
  date: Date;
};

export enum SocketEvent {
  Message = "message",
  JoinRoom = "joinRoom",
  CreateRoom = "createRoom",
  Connection = "connection",
  Disconnection = "disconnection",
}
