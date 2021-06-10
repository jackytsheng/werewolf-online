import React, { useEffect, useState } from "react";
import styled from "styled-components";
import ChatBubble from "../components/ChatBubble";
// import useQuery from "../hooks/urlQuery";
import { color } from "../themes";
import { Message } from "../components/ChatBubble";
import TextField from "@material-ui/core/TextField";
import useSocket, { MessagePayload } from "../hooks/socket";
import useQuery from "../hooks/urlQuery";
import { payloadToMessage } from "../mapper";

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

type LobbyProps = {
  messages: Message[];
};

const Lobby = () => {
  const { send, messages } = useSocket({ userId: "querysd", roomId: "sdsdsd" });

  const [value, setValue] = useState("");

  const onType = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    const { value } = event.target;
    setValue(value);
  };

  const onEnter = (event: React.KeyboardEvent<HTMLDivElement>) => {
    const { key } = event;
    if (key === "Enter") {
      console.log(value);
      setValue("");
      send(value);
      event.preventDefault();
    }
  };

  return (
    <BackWrapper>
      <TextContainer>
        <MessageContainer>
          {messages.map((payload: MessagePayload) => {
            const message = payloadToMessage(payload);
            <ChatBubble
              {...message}
              key={`${message.speaker.replaceAll(
                " ",
                ""
              )}_${message.time.replaceAll(" ", "")}`}
            ></ChatBubble>;
          })}
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
