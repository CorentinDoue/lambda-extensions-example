import fetch from "node-fetch";
import { TEST_HTTP_CALLS_URL } from "../../urls";

export const hello = async () => {
  await fetch(TEST_HTTP_CALLS_URL);

  await fetch(TEST_HTTP_CALLS_URL, {
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
