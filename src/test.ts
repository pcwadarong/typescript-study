console.log("hello");
let a: number = 5;

function removeSpaces(text: string | undefined | null) {
    if (typeof text === "string") {
      return text.replaceAll(" ", "");
    } else {
      return undefined;
    }
  } 
  let result = removeSpaces("hi im winterlood") as string;
  result.toUpperCase();