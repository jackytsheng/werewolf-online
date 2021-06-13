import React, { useEffect, useState } from "react";
import styled from "styled-components";
import ChatBubble from "../components/ChatBubble";
import { color } from "../themes";
import TextField from "@material-ui/core/TextField";
import useSocket, { Message } from "../hooks/socket";
import useQuery from "../hooks/urlQuery";
import { useHistory } from "react-router";

const BackWrapper = styled.div({
  display: "flex",
  justifyContent: "center",
  flexDirection: "column",
  position: "fixed",
  alignItems: "center",
  top: 0,
  bottom: 0,
  left: 0,
  right: 0,
});

const MessageContainer = styled.div({
  padding: "1.875rem",
  flex: 1,
  overflowY: "auto",
  backgroundColor: color.white,
});

const TextContainer = styled.div({
  width: "40rem",
  display: "flex",
  flexDirection: "column",
  flex: 1,
  paddingBottom: "1rem",
});

const Lobby = () => {
  // get username and room from uri
  const userName = decodeURI(useQuery("username"));
  const roomId = useQuery("room");

  const { send, messages } = useSocket({ roomId, userName });

  const [value, setValue] = useState("");

  const onType = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    const { value } = event.target;
    setValue(value);
  };

  const onEnter = (event: React.KeyboardEvent<HTMLDivElement>) => {
    const { key } = event;
    if (key === "Enter") {
      setValue("");
      send(value);
      event.preventDefault();
    }
  };
  return (
    <BackWrapper>
      <TextContainer>
        <MessageContainer>
          {messages.map((message: Message) => (
            <ChatBubble
              {...message}
              key={`${message.userName.replaceAll(" ", "")}_${message.time}`}
            />
          ))}
        </MessageContainer>
        <TextField
          fullWidth={true}
          id="outlined-multiline-static"
          label="Enter Text"
          multiline
          value={value}
          variant="outlined"
          onChange={onType}
          onKeyDown={onEnter}
        />
      </TextContainer>
    </BackWrapper>
  );
};

export default Lobby;
