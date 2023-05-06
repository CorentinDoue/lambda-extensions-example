import { rest } from "msw";
import { setupServer } from "msw/node";
import fetch from "node-fetch";

console.log("Executing interceptor extension code...");

const LOG_EXTENSION_SERVER_URL = "http://sandbox:4243";
const server = setupServer(
  rest.all("*", async (req, res, ctx) => {
    const url = req.url.toString();
    if (url.includes(LOG_EXTENSION_SERVER_URL)) {
      return req.passthrough();
    }
    const method = req.method;
    const headers = req.headers;
    const body = await req.text();

    console.log(`request intercepted in interceptor: ${method} ${url}`);
    fetch(LOG_EXTENSION_SERVER_URL, {
      method: "POST",
      body: JSON.stringify({
        url,
        method,
        headers,
        body,
        date: new Date().toISOString(),
      }),
    }).catch((error) =>
      console.error("error sending logs in interceptor extension", error)
    );

    return req.passthrough();
  })
);

server.listen({ onUnhandledRequest: "bypass" });
