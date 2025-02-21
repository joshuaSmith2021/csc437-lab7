export type GroceryData = { name: string; price: number }[];

const DATA: Record<string, GroceryData> = {
  "": [],
  MDN: [
    { name: "baked beans", price: 0.4 },
    { name: "hot dogs", price: 1.99 },
    { name: "spam", price: 2.85 },
    { name: "refried beans", price: 0.99 },
    { name: "kidney beans", price: 0.58 },
  ],
  "Liquor store": [
    { name: "beer", price: 20.2 },
    { name: "red wine", price: 50 },
    { name: "vodka", price: 30 },
    { name: "margarita", price: 23 },
    { name: "cola", price: 1.2 },
  ],
  Butcher: [
    { name: "chicken breast", price: 2.2 },
    { name: "ham", price: 3.3 },
    { name: "steak", price: 6.6 },
    { name: "chicken drumsticks", price: 2.1 },
    { name: "pork shoulder", price: 4.32 },
  ],
};

function delayMs(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

export const groceryFetcher = {
  fetch: async function (source: string) {
    await delayMs(500 + Math.random() * 3000); // Between 500 and 3500 ms

    if (!(source in DATA)) {
      throw new Error(`No data found for source ${source}`);
    }

    return DATA[source];
  },
};
