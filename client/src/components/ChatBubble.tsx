import React from "react";
import styled from "styled-components";
import { Message } from "../hooks/socket";
import { border, color } from "../themes";

const TimeStyle = styled.span({
  color: color.meta,
  marginLeft: "0.25rem",
  fontWeight: "normal",
});

const Meta = styled.p({
  fontSize: "0.9375rem",
  fontWeight: "bold",
  color: color.midBlue,
  opacity: 0.7,
  marginBottom: "0.4375rem",
});

type MetaTextProps = {
  speaker: String;
  time: String;
};

const MetaText: React.FC<MetaTextProps> = ({
  speaker,
  time,
}: MetaTextProps) => (
  <Meta>
    {speaker}
    <TimeStyle>{time}</TimeStyle>
  </Meta>
);

const BubbleWrapper = styled.div({
  padding: "0.625rem",
  marginBottom: "0.9375rem",
  borderRadius: border.ContainerRadius,
  overflowWrap: "break-word",
  backgroundColor: color.lightColor,
});

const Text = styled.p({
  marginBottom: "1rem",
});

const ChatBubble: React.FC<Message> = ({
  time,
  userName,
  content,
}: Message) => {
  return (
    <BubbleWrapper>
      <MetaText speaker={userName} time={time} />
      <Text>{content}</Text>
    </BubbleWrapper>
  );
};

export default ChatBubble;
