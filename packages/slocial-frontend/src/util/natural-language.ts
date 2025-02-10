/**
 * Represent a unit as it is used in natural language, e.g. "meter", "friends",
 * etc.
 */
export type NaturalLanguageUnit =
  | string
  | {
      singular: string;
      plural?: string;
    };

export const pluralize = (quantity: number, unit: NaturalLanguageUnit) => {
  if (typeof unit === "string") {
    return unit + (quantity === 1 ? "" : "s");
  } else {
    return quantity === 1 ? unit.singular : unit.plural || `${unit.singular}s`;
  }
};
