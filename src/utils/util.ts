export const noop = () => {};

const formatWithPattern = (value: string, maxLength: number, pattern?: RegExp, replaceWith?: string) => {
  const cleanValue = value.replace(/\D/g, '').slice(0, maxLength);
  return pattern && replaceWith ? cleanValue.replace(pattern, replaceWith) : cleanValue;
};

export const formatExpirationDate = (value: string) => {
  return formatWithPattern(value, 4, /(\d{2})(?=\d)/, '$1/');
};

export const formatSecurityCode = (value: string) => {
  return formatWithPattern(value, 3);
};
