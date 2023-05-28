export type Log = {
  url: string;
  method: string;
  headers: Record<string, string>;
  body: string;
  date: string;
};

export type LambdaInvocationContext = {
  requestId: string;
  invokedFunctionArn: string;
  invokedAt: string;
};
