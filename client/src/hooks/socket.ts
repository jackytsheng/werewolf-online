import React, { useEffect, useState, useRef } from "react";
import io, { Socket } from "socket.io-client";

// Credit to this Champ Jonas Grøndahl for the hook implmentation
// Video is found here https://www.youtube.com/watch?v=R3UJAIMjWpU&ab_channel=JonasGr%C3%B8ndahl

const baseUrl = "http://localhost:8000";

enum SocketEvent {
  Message = "message",
  JoinRoom = "joinRoom",
  CreateRoom = "createRoom",
  Connect = "connect",
  Disconnect = "disconnect",
  Reconnect = "reconnect",
}

type SocketProps = {
  roomId: string;
  userName: string;
  enabled?: boolean;
  onConnected?: () => void;
};

type JoinRoomPayload = {
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

export type Game = {
  roomId: string;
  user: User;
};

const useSocket = ({
  roomId,
  userName,
  enabled = true,
  onConnected,
}: SocketProps) => {
  const ref = useRef<Socket>();
  const [gameInfo, setGameInfo] = useState<Game>();
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
      time: new Date().toLocaleTimeString(),
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
      join(roomId, userName);
    }

    const info: Game = {
      user: { userName, userId: socket.id },
      roomId,
    };
    setGameInfo(info);

    socket.on(SocketEvent.CreateRoom, (roomId: string) => {
      console.log(`${roomId} room ID is received`);
      // setGameInfo({ ...gameInfo, roomId } as Game);
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

    socket.on(SocketEvent.Reconnect, () => {
      console.log("reconnect successful");
    });

    // clean up when the property changes or dismounted
    return () => {
      socket.disconnect();
    };
  }, [enabled, roomId, userName]);

  return {
    messages,
    send,
  };
};

export default useSocket;
