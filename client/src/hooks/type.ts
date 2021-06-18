export enum SocketEvent {
  Message = 'message',
  JoinRoom = 'joinRoom',
  CreateRoom = 'createRoom',
  Connect = 'connect',
  Disconnect = 'disconnect',
  Reconnect = 'reconnect',
  RoomInfo = 'roomInfo',
}

export type SocketProps = {
  roomId: string;
  userName: string;
  enabled?: boolean;
  onConnected?: () => void;
};

export type JoinRoomPayload = {
  roomId: string;
  userName: string;
};

export type Message = {
  content: string;
  userName: string;
  time: string;
};

export type User = {
  userName: string;
  userId: string;
};

export type RoomInfo = {
  roomId: string;
  users: User[];
};
export type LobbyInfo = {
  currentRoomId: string;
  currentUser: User;
  users: User[];
};
