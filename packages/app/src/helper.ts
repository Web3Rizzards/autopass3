export const getCapitalizedString = (text: string) => {
  if (text === "") {
    return text;
  }

  const firstChar = text[0];
  const secondHalf = text.slice(1);

  return firstChar.toUpperCase() + secondHalf;
};
