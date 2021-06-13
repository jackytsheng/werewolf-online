import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { TextField, withStyles } from "@material-ui/core";
import { color } from "../themes";
import useSocket, { Message } from "../hooks/socket";
import useQuery from "../hooks/urlQuery";
import { ChatBubble, Popper, Title } from "../components";

const CssTextField = withStyles({
  root: {
    "& .MuiFormLabel-root.Mui-focused": {
      color: color.midBlue,
    },
    "& .MuiFilledInput-underline:after": {
      border: `0.125rem solid ${color.midBlue}`,
    },
    backgroundColor: color.beige,
    "& .MuiFilledInput-root": {
      backgroundColor: "transparent",
    },
  },
})(TextField);

const BackWrapper = styled.div({
  display: "flex",
  position: "fixed",
  flexDirection: "column",
  top: 0,
  bottom: 0,
  left: 0,
  right: 0,
});

const Bar = styled.div({
  backgroundColor: color.framingBrown,
  height: "10%",
  width: "100%",
});

const HeaderBar = styled(Bar)({
  display: "flex",
  paddingLeft: "2rem",
  alignItems: "center",
});

const Main = styled.div({
  display: "flex",
  justifyContent: "center",
  height: "80%",
  backgroundColor: color.darkBlue,
});

const ChatSpace = styled.div({
  maxWidth: "60.5rem",
  padding: "0 3rem",
  display: "flex",
  flexDirection: "column",
  overflow: "auto",
  backgroundColor: color.midBlue,
});

const MessageContainer = styled.div({
  maxWidth: "28.125rem",
  flexDirection: "column",
  display: "flex",
  flex: 1,
  padding: "1.875rem",
  overflowY: "auto",
  backgroundColor: color.beige,
});

const SideContainer = styled.div({ width: "50rem", display: "flex" });

const Lobby = () => {
  // get username and room from uri
  const userName = decodeURI(useQuery("username"));
  const roomId = useQuery("room");

  const { send, messages, lobbyInfo } = useSocket({ roomId, userName });

  const [value, setValue] = useState("");

  const onType = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    const { value } = event.target;
    setValue(value);
  };

  const onEnter = (event: React.KeyboardEvent<HTMLDivElement>) => {
    const { key } = event;
    if (key === "Enter") {
      setValue("");
      value.trim() && send(value);
      event.preventDefault();
    }
  };
  return (
    <BackWrapper>
      <HeaderBar>
        <Title text="Werewolf Lobby" />
      </HeaderBar>
      <Main>
        <ChatSpace>
          <MessageContainer>
            {messages.map((message: Message) => (
              <ChatBubble
                {...message}
                key={`${message.userName.replaceAll(" ", "")}_${message.time}`}
              />
            ))}
          </MessageContainer>
        </ChatSpace>
      </Main>
      <Bar>
        <SideContainer>
          <CssTextField
            id="multi-line-input"
            label="Enter Message"
            variant="filled"
            multiline
            rowsMax={2}
            value={value}
            onChange={onType}
            onKeyDown={onEnter}
          />
          <Popper
            link={`${window.location.origin}/home?room=${lobbyInfo.currentRoomId}`}
          />
        </SideContainer>
      </Bar>
    </BackWrapper>
  );
};

export default Lobby;
