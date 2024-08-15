import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function removeLasOcurrenceWordFromString(
  inputString: string,
  word: string
) {
  // Find the last occurrence of the word "normal"
  const lastNormalIndex = inputString.lastIndexOf(word);

  // If "normal" is found, remove it and return the modified string
  if (lastNormalIndex !== -1) {
    const resultString =
      inputString.slice(0, lastNormalIndex) +
      inputString.slice(lastNormalIndex + word.length);
    return resultString;
  } else {
    // If "normal" is not found, return the original string
    return inputString;
  }
}

export function shuffleArray(array: any[]) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
}
