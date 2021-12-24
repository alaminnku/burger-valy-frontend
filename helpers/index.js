import cookie from "cookie";

export function parseCookies(req) {
  return cookie.parse(req ? req.headers.cookie || "" : "");
}

export function convertName(text) {
  const [firstWord, ...restWords] = text.split(" ");

  // Convert to the text
  const convertedText = `${firstWord.replace(
    firstWord[0],
    firstWord[0].toLowerCase()
  )}${restWords.join("")}`;

  return convertedText;
}
