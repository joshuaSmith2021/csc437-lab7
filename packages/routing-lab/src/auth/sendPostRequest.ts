export const sendPostRequest = async (url: string, payload: unknown) =>
  await fetch(url, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });
