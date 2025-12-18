export const Regex = {
  ONE_DIGIT: /\d/,
  DIGIT_LENGTH: /[0-9]/,
  ONE_UPPERCASE_LOWERCASE: /(?=.*[a-z])(?=.*[A-Z])/,
  ONE_SYMBOL: /[^a-zA-Z0-9\s]/,
  SIMPLE_PATTERN: /^(?:(?!abcd|1234).)*$/,
};

export const regexArray = [
  Regex.ONE_DIGIT,
  Regex.ONE_UPPERCASE_LOWERCASE,
  Regex.DIGIT_LENGTH,
  Regex.ONE_SYMBOL,
  Regex.SIMPLE_PATTERN,
];
