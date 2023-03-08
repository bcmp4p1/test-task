export const validateNumber = (input: string) => {
  const onlyNumbers = input.replace(/[^0-9,]/g, '');
  return onlyNumbers.replace(/,[,]+/g, ',');
};
