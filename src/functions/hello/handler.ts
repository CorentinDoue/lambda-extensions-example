
import fetch from "node-fetch";


export const hello = async () => {
  const response = await fetch(
    "https://webhook.site/c5da91c2-2926-4b11-96d2-23c2956afbe8"
  );
  console.log("response", await response.json());

  await fetch("https://webhook.site/c5da91c2-2926-4b11-96d2-23c2956afbe8", {
    method: "POST",
  });

  return {
    statusCode: 200,
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      message: 'OK',
    }),
  };
};

export const handler = hello
