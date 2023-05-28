import { createServer } from "http";
import { Log } from "./types";

type LogServerOptions = {
  port: number;
};
export const listenForLog = (
  onLogReceived: (log: Log) => void,
  { port }: LogServerOptions = { port: 4243 }
) => {
  const server = createServer(function (request, response) {
    if (request.method == "POST") {
      let body = "";
      request.on("data", function (data) {
        body += data;
      });
      request.on("end", function () {
        try {
          onLogReceived(JSON.parse(body));
        } catch (e) {
          console.error("failed to parse logs", e);
        }
        response.writeHead(200, {});
        response.end("OK");
      });
    } else {
      console.error("unexpected request", request.method, request.url);
      response.writeHead(404, {});
      response.end();
    }
  });

  server.listen(port, "sandbox");
  console.info(`Listening for logs at http://sandbox:${port}`);
};
