import { Message } from "../type";

export const timestamp = (text: String) =>
  `[${new Date()
    .toLocaleString()
    .replace(",", "")
    .replaceAll("/", "-")}] ${text}`;

export const capitalise = (str: String) =>
  str[0].toUpperCase() + str.slice(1, str.length).toLowerCase();

const BOT_NAME = "Sponge Bot";

export const botSay = (content: string): Message => ({
  userName: BOT_NAME,
  time: new Date().toLocaleTimeString("en-US"),
  content,
});
