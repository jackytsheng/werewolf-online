import React, { useEffect } from "react";
import styled from "styled-components";
import ChatBubble from "../components/ChatBubble";
import { color } from "../themes";

const fakePaylod = {
  time: "9:03 pm",
  speaker: "Sponge Bob",
  text: "Welcome to Werewolf Lobby",
};

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
  width: "40rem",
  overflowY: "auto",
  backgroundColor: color.white,
});

const Lobby = () => {
  return (
    <BackWrapper>
      <MessageContainer>
        <ChatBubble {...fakePaylod}></ChatBubble>
        <ChatBubble {...fakePaylod}></ChatBubble>
        <ChatBubble {...fakePaylod}></ChatBubble>
        <ChatBubble {...fakePaylod}></ChatBubble>
        <ChatBubble {...fakePaylod}></ChatBubble>
        <ChatBubble {...fakePaylod}></ChatBubble>
        <ChatBubble {...fakePaylod}></ChatBubble>
        <ChatBubble {...fakePaylod}></ChatBubble>
        <ChatBubble {...fakePaylod}></ChatBubble>
      </MessageContainer>
    </BackWrapper>
  );
};

export default Lobby;
