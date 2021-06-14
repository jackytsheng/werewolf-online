import React, { useEffect, useRef, useState } from "react";
import styled from "styled-components";
import { TextField, withStyles } from "@material-ui/core";
import { color } from "../themes";
import useSocket, { Message } from "../hooks/socket";
import useQuery from "../hooks/urlQuery";
import { ChatBubble, CopyLinkPopper, Title } from "../components";
import Seat from "../components/Seat";

const CssTextField = withStyles({
  root: {
    "& .MuiInputBase-input": {
      color: color.text,
    },
    "& .MuiFormLabel-root.Mui-focused": {
      color: color.midBlue,
    },
    "& .MuiFilledInput-underline:after": {
      border: `0.125rem solid ${color.midBlue}`,
    },
    "& .MuiFilledInput-root": {
      backgroundColor: color.beige,
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
  display: "flex",
  width: "100%",
});

const HeaderBar = styled(Bar)({
  height: "10%",
  padding: "0 2rem",
  alignItems: "center",
  justifyContent: "space-between",
});

const BottomBar = styled(Bar)({
  height: "15%",
  justifyContent: "center",
  paddingTop: "1.5rem",
});

const Main = styled.div({
  display: "flex",
  position: "relative",
  justifyContent: "center",
  height: "75%",
  backgroundColor: color.darkBlue,
});

const ChatSpace = styled.div({
  maxWidth: "60.5rem",
  display: "flex",
  justifyContent: "center",
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

const SideContainer = styled.div({
  width: "18rem",
  height: "3.4rem",
  display: "flex",
});

const SeatContainer = styled.div({
  width: "12rem",
  display: "flex",
  flexDirection: "column",
  justifyContent: "space-between",
});

const MenuBar = styled.div({
  padding: "0.5rem",
  // backgroundColor: color.beige,
  height: "30%",
  right: 0,
  top: 0,
  display: "flex",
  flexDirection: "column",
  position: "absolute",
});

const Lobby = () => {
  // get username and room from uri
  const userName = decodeURI(useQuery("username"));
  const messageContainerRef = useRef<HTMLDivElement>(null);
  const roomId = useQuery("room");

  const { send, messages, lobbyInfo } = useSocket({ roomId, userName });

  const [value, setValue] = useState("");

  useEffect(() => {
    const el = messageContainerRef?.current;
    el?.scroll(0, el?.scrollHeight);
  }, [messages]);

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
        <CopyLinkPopper
          link={`${window.location.origin}/home?room=${lobbyInfo.currentRoomId}`}
        />
      </HeaderBar>
      <Main>
        <ChatSpace>
          <SeatContainer>
            <Seat namePos="right" name="Jacky" seatNumber={1} />
            <Seat namePos="right" name="Jacky 2" seatNumber={2} />
            <Seat namePos="right" name="Jacky 3sdfsdef" seatNumber={3} />
            <Seat namePos="right" name="Jacky 3sdfsdef" seatNumber={4} />
            <Seat namePos="right" name="Jacky 3sdfsdef" seatNumber={5} />
            <Seat namePos="right" name="Jacky 3sdfsdef" seatNumber={6} />
            <Seat namePos="right" name="Jacky 3sdfsdef" seatNumber={7} />
            <Seat namePos="right" name="Jacky 3sdfsdef" seatNumber={8} />
          </SeatContainer>
          <MessageContainer ref={messageContainerRef}>
            {messages.map((message: Message) => (
              <ChatBubble
                {...message}
                key={`${message.userName.replaceAll(" ", "")}_${
                  message.time
                }_${message.content.replaceAll(" ", "")}`}
              />
            ))}
          </MessageContainer>
          <SeatContainer>
            <Seat namePos="left" name="Jacky" seatNumber={9} />
            <Seat namePos="left" name="Jacky 2" seatNumber={10} />
            <Seat namePos="left" name="Jacky 3" seatNumber={11} />
            <Seat namePos="left" isPlaceHolder={true} />
            <Seat namePos="left" isPlaceHolder={true} />
            <Seat namePos="left" isPlaceHolder={true} />
            <Seat namePos="left" isPlaceHolder={true} />
            <Seat namePos="left" isPlaceHolder={true} />
            <Seat namePos="left" isPlaceHolder={true} />
            <Seat namePos="left" isPlaceHolder={true} />
          </SeatContainer>
        </ChatSpace>
      </Main>
      <BottomBar>
        <SideContainer>
          <CssTextField
            id="multi-line-input"
            label="Enter Message"
            variant="filled"
            multiline
            fullWidth={true}
            rowsMax={2}
            value={value}
            onChange={onType}
            onKeyDown={onEnter}
          />
        </SideContainer>
      </BottomBar>
    </BackWrapper>
  );
};

export default Lobby;
