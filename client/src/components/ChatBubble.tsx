import React from "react";
import styled from "styled-components";
import { border, color } from "../themes";

const TimeStyle = styled.span({
  color: color.text,
  marginLeft: "0.25rem",
  fontWeight: "normal",
});

const Meta = styled.p({
  fontSize: "0.9375rem",
  fontWeight: "bold",
  color: color.darkColorB,
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

export type Message = {
  time: String;
  speaker: String;
  text: String;
};

const ChatBubble: React.FC<Message> = ({ time, speaker, text }: Message) => {
  return (
    <BubbleWrapper>
      <MetaText speaker={speaker} time={time} />
      <Text>{text}</Text>
    </BubbleWrapper>
  );
};

export default ChatBubble;
