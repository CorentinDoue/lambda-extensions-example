import { rest } from "msw";
import { setupServer } from "msw/node";

console.log("Executing interceptor extension code...");

const server = setupServer(
  rest.all("*", async (req, res, ctx) => {
    const url = req.url.toString();
    const method = req.method;
    console.log(`request intercepted: ${method} ${url}`);

    return res(
      ctx.status(200),
      ctx.json({
        message: "This call have been intercepted by the interceptor extension",
      })
    );
  })
);

server.listen({ onUnhandledRequest: "bypass" });
