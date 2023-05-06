import fetch from "node-fetch";

export const hello = async () => {
  await fetch("https://webhook.site/87c3df17-c965-40d9-a616-790c4002a162");

  await fetch("https://webhook.site/87c3df17-c965-40d9-a616-790c4002a162", {
    method: "POST",
    body: JSON.stringify({
      message: "hello world",
    }),
  });

  return {
    statusCode: 200,
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      message: "OK",
    }),
  };
};

export const handler = hello;
