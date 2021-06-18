import React, { useEffect, useState, useRef } from 'react';
import io, { Socket } from 'socket.io-client';
import {
  SocketProps,
  LobbyInfo,
  Message,
  SocketEvent,
  JoinRoomPayload,
  RoomInfo,
} from './type';

// Credit to this Champ Jonas Grøndahl for the hook implmentation
// Video is found here https://www.youtube.com/watch?v=R3UJAIMjWpU&ab_channel=JonasGr%C3%B8ndahl

const baseUrl = 'localhost:8000';

const useSocket = ({
  roomId,
  userName,
  enabled = true,
  onConnected,
}: SocketProps) => {
  const ref = useRef<Socket>();
  const [lobbyInfo, setLobbyInfo] = useState<LobbyInfo>({
    currentRoomId: '',
    currentUser: { userId: '', userName: '' },
    users: [],
  });
  const [messages, setMessages] = useState<Message[]>([]);

  const createRoom = (userName: string) => {
    ref.current!.emit(SocketEvent.CreateRoom, userName);
    console.log(`room created by ${userName}`);
  };

  const join = (roomId: string, userName: string) => {
    const payload: JoinRoomPayload = { roomId, userName };
    ref.current!.emit(SocketEvent.JoinRoom, payload);
  };

  const send = (content: string) => {
    const payload: Message = {
      time: new Date().toLocaleTimeString('en-US'),
      userName,
      content,
    };
    ref.current!.emit(SocketEvent.Message, payload);
  };

  useEffect((): any => {
    // its for advance asynchronus call to conditally disable this hook, but in this project it may not be necessary
    if (!enabled) {
      return;
    }

    const socket = io(`${baseUrl}`);

    // can be accessed anywhere inside this hook
    ref.current = socket;

    // if there isn't roomId create one
    if (!roomId) {
      createRoom(userName);
    } else {
      // if there is roomId join it instead
      const currentUser = { userId: socket.id, userName };

      setLobbyInfo({
        currentRoomId: roomId,
        currentUser,
        users: [currentUser],
      } as LobbyInfo);
      join(roomId, userName);
    }

    socket.on(SocketEvent.CreateRoom, (roomId: string) => {
      console.log(`${roomId} room ID is received`);

      // this replace the newest history while maintaining the state
      window.history.replaceState(
        window.history.state,
        '',
        `${window.location.href}&room=${roomId}`
      );

      const currentUser = { userId: socket.id, userName };
      setLobbyInfo({
        currentRoomId: roomId,
        currentUser,
        users: [currentUser],
      } as LobbyInfo);
    });

    socket.on(SocketEvent.Message, (payload: Message) => {
      setMessages((prev) => prev.concat(payload));
    });

    // call back that passed in if hook is called
    socket.on(SocketEvent.Connect, () => {
      if (onConnected) {
        onConnected();
      }
      console.log(`${socket.id} is connected`);
      console.log(`Socket is connected at ${baseUrl}`);
    });

    socket.on(SocketEvent.RoomInfo, (roomInfo: RoomInfo) => {
      setLobbyInfo((prev) => ({ ...prev, users: roomInfo.users }));
      console.log(roomInfo);
    });

    socket.on(SocketEvent.Reconnect, () => {
      console.log('reconnect successful');
    });

    // clean up when the property changes or dismounted
    return () => {
      socket.disconnect();
    };
  }, [enabled, roomId, userName]);

  return {
    lobbyInfo,
    messages,
    send,
  };
};

export default useSocket;
