import React, { useEffect, useState, useRef } from "react";
import io, { Socket } from "socket.io-client";

// Credit to this Champ Jonas Grøndahl for the hook implmentation
// Video is found here https://www.youtube.com/watch?v=R3UJAIMjWpU&ab_channel=JonasGr%C3%B8ndahl

const baseUrl = "http://localhost:8000";
// const fakeroom = "1234";

type SocketProps = {
  userId: String;
  roomId: String;
  enabled?: Boolean;
  onConnected?: () => void;
};

export type MessagePayload = {
  content: String;
  userId: String;
  date: Date;
};

const useSocket = ({
  userId,
  roomId,
  enabled = true,
  onConnected,
}: SocketProps) => {
  const ref = useRef<Socket>();
  const [messages, setMessages] = useState<MessagePayload[]>([]);

  const join = () => {
    ref.current!.emit("joinRoom");
  };
  const send = (msg: String) => {
    const payload: MessagePayload = {
      userId,
      date: new Date(),
      content: msg,
    };
    ref.current!.emit("message", payload);

    ref.current!.emit("joinRoom");
  };

  useEffect((): any => {
    // its for advance asynchronus call to conditally disable this hook, but in this project it may not be necessary
    if (!enabled) {
      return;
    }

    const socket = io(`${baseUrl}`);

    socket.emit("joinRoom", userId);

    socket.on("message", (payload: MessagePayload) => {
      setMessages((prev) => prev.concat(payload));
    });

    socket.on("disconnect", () => {
      console.log("disconnected");
    });

    // call back that passed in if hook is called
    socket.on("connect", () => {
      if (onConnected) {
        onConnected();
      }
      console.log(`${socket.id} is connected`);
      console.log(`Socket is connected at ${baseUrl}`);
    });

    socket.on("reconnect", () => {
      socket.emit("joinRoom", userId);
      console.log("reconnect successful");
    });

    // can be accessed anywhere inside this hook
    ref.current = socket;

    // clean up when the property changes or dismounted
    return () => {
      console.log(`${socket.id} is disconnected`);
      socket.disconnect();
    };
  }, [enabled, userId]);

  return {
    socket: ref.current,
    send,
    messages,
    join,
  };
};

export default useSocket;
