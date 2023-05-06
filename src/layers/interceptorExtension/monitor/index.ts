import { EventTypes, ExtensionAPIService } from "lambda-extension-service";
import { Log } from "./types";
import { LogAggregator } from "./logAggregator";
import { listenForLog } from "./logServer";
import { LambdaContext } from "./lambdaContext";
import { forwardLogs } from "./forwardLogs";

console.log("Executing monitor extension code...");

const main = async () => {
  const logAggregator = new LogAggregator();
  const lambdaContext = new LambdaContext();
  const onLogReceived = (log: Log) => {
    logAggregator.addLog(log, lambdaContext.getRequestId());
  };
  listenForLog(onLogReceived);

  const extensionApiService = new ExtensionAPIService({
    extensionName: "monitor",
  });
  await extensionApiService.register([EventTypes.Invoke, EventTypes.Shutdown]);

  while (true) {
    const event = await extensionApiService.next();
    const lastContext = lambdaContext.getContext();
    lambdaContext.updateContext(event);

    if (lastContext !== undefined) {
      await forwardLogs({
        context: lastContext,
        logs: logAggregator.getLogs(lastContext.requestId),
      });
    }
  }
};

main().catch((error) => console.error(error));
