export const containsKeyword = (text: string, keywords: string[]): boolean => {
  const words = text.toLowerCase().split(/\s+/);

  const lowerCaseKeywords = keywords.map((keyword) => keyword.toLowerCase());

  return words.some((word) => lowerCaseKeywords.includes(word));
};
