export default (text: String) =>
  `[${new Date()
    .toLocaleString()
    .replace(",", "")
    .replaceAll("/", "-")}] ${text}`;
