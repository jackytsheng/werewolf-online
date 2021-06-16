export type Message = {
  content: string;
  userName: string;
  time: string;
};

export enum SocketEvent {
  Message = 'message',
  JoinRoom = 'joinRoom',
  CreateRoom = 'createRoom',
  Connection = 'connection',
  Disconnect = 'disconnect',
  RoomInfo = 'roomInfo',
}

export type RoomInfo = {
  roomId: string;
  users: User[];
};

export type User = {
  roomId: string;
  userId: string;
  userName: string;
};

export type JoinRoomPayload = {
  roomId: string;
  userName: string;
};

export enum Role {
  WEREWOLF = 'WEREWOLF',
  WITCH = 'WITCH',
  VILLAGER = 'VILLAGER',
  HUNTER = 'HUNTER',
  PROPHET = 'PROPHET',
  IDIOT = 'IDIOT',
}
