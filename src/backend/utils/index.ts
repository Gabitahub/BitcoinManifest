const { v4 } = require("uuid");

export const createToken = (): string => {
  const uuidNew = v4();
  return uuidNew;
};

export const generateRandomNumbersArray = (upperLimitId: number, quantity: number) => {
  const idSet = new Set();
  let index = 0
  while (index < quantity && idSet.size < quantity) {
    const randomId = Math.floor(Math.random() * (upperLimitId + 1));
    idSet.add(Number(randomId));
    index++
  }

  return Array.from(idSet) as number[];
};
