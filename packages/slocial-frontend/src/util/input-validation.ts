export const isValidCalpolyEmail = (input: string) =>
  /[A-Za-z0-9]+@calpoly\.edu/gi.test(input);
