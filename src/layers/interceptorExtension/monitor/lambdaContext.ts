import { LambdaInvocationContext } from "./types";
import {
  EventTypes,
  InvokeEvent,
  ShutdownEvent,
} from "lambda-extension-service";

export class LambdaContext {
  context: LambdaInvocationContext | undefined = undefined;

  updateContext(event: InvokeEvent | ShutdownEvent): void {
    if (event.eventType === EventTypes.Invoke) {
      this.context = {
        requestId: event.requestId,
        invokedFunctionArn: event.invokedFunctionArn,
        invokedAt: new Date().toISOString(),
      };
    } else {
      this.context = undefined;
    }
  }

  getContext(): LambdaInvocationContext | undefined {
    return this.context;
  }

  getRequestId(): string | undefined {
    return this.context?.requestId;
  }
}
