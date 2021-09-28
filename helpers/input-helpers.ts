export const generateInputName = (text: string): string => text.replace(/ /g, '-').toLowerCase();

export const generateLabelText = (text: string, required: boolean = false): string => `${text} ${required ? '*' : ''}`.trim();
