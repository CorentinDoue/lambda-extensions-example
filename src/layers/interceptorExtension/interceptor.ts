import { rest } from "msw";
import { setupServer } from "msw/node";
import { EventTypes, ExtensionAPIService } from "lambda-extension-service";

console.log("Executing interceptor extension code...");

const server = setupServer(
  rest.all("*", async (req, res, ctx) => {
    const url = req.url.toString();
    if (
      process.env.AWS_LAMBDA_RUNTIME_API &&
      url.includes(process.env.AWS_LAMBDA_RUNTIME_API)
    ) {
      return req.passthrough();
    }
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

const main = async () => {
  const extensionApiService = new ExtensionAPIService({
    extensionName: "interceptor-extension",
  });
  await extensionApiService.register([EventTypes.Invoke]); // EventTypes.Shutdown is not supported for internal extensions
  extensionApiService.onTelemetryEvent((event) =>
    console.log("Telemetry event received: ", JSON.stringify(event))
  );
  await extensionApiService.registerTelemetry();

  while (true) {
    const event = await extensionApiService.next();
    console.log("Next lambda event received: ", JSON.stringify(event));
  }
};

main().catch((error) => console.error(error));
