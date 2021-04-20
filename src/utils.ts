export const splitLines = (item: string) => item.split("\n");

export const getNonEmptyStrings = (value: string) => value !== "";

export const sanitizeString = (str: string) => str.replace(/[\*\_]/g, "");

export const removeTitles = (str: string) => str.replace(/[\w|\s]+\:/, "");

export const trimWhiteSpace = (str: string) => str.trim();

