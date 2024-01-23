import { NumberInput } from "./types";
import { convert } from "./converter";

const handleConvert = (
  number: NumberInput,
  lang: "fr" | "bg"
): string | string[] => {
  if (typeof number === "number") {
    return convert(number, lang);
  } else if (typeof number === "object") {
    return number.map((n) => convert(n, lang)).join(", ");
  } else {
    throw new Error("Invalid input");
  }
};

export const fr = (number: NumberInput): string | string[] =>
  handleConvert(number, "fr");
export const bg = (number: NumberInput): string | string[] =>
  handleConvert(number, "bg");
