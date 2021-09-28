export const removeSpecialCharacters = (text: string = ''): string => (
  text.replace(/[^a-zA-Z0-9 ]/g, '')
);
