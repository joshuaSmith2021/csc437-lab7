import { NaturalLanguageUnit, pluralize } from "./natural-language";

const transformations: {
  unit: NaturalLanguageUnit;
  converter: (quantity: number) => number;
}[] = [
  { unit: "second", converter: (n) => n / 1000 },
  { unit: "minute", converter: (n) => n / 60 },
  { unit: "hour", converter: (n) => n / 60 },
  { unit: "day", converter: (n) => n / 24 },
  { unit: "week", converter: (n) => n / 7 },
  { unit: "month", converter: (n) => n / 4 },
];

export const parseTimestamp: (date: Date) => string = (date: Date) => {
  const dateDiffMillis = Date.now() - date.getTime();
  if (dateDiffMillis < 1000) {
    return "just now";
  }

  let value = { quantity: dateDiffMillis, unit: "millisecond" };
  for (const { unit, converter } of transformations) {
    const newValue = converter(value.quantity);
    if (newValue < 1) {
      break;
    }

    value = { quantity: newValue, unit: unit as string };
  }

  value.quantity = Math.floor(value.quantity);

  return `${value.quantity} ${pluralize(value.quantity, value.unit)} ago`;
};
