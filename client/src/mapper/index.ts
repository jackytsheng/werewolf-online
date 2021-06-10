import { Message } from "../components/ChatBubble";
import { MessagePayload } from "../hooks/socket";

const payloadToMessage = (payload: MessagePayload): Message => ({
  time: payload.date.toLocaleDateString(),
  speaker: payload.userId,
  text: payload.content,
});

const messageToPayload = (message: Message): MessagePayload => ({
  userId: message.speaker,
  date: new Date(),
  content: message.text,
});

export { payloadToMessage, messageToPayload };
