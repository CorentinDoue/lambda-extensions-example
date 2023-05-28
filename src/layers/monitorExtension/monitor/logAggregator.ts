import { Log } from "./types";

const BEFORE_INIT = "BEFORE_INIT";
export class LogAggregator {
  public logMap: Record<string, Record<string, Log>> = {};

  addLog(log: Log, requestId: string = BEFORE_INIT): void {
    if (!(requestId in this.logMap)) {
      this.logMap[requestId] = {};
    }
    (this.logMap[requestId] as Record<string, Log>)[log.date] = log;
  }

  getLogs(requestId: string): Record<string, Log> {
    const logs = this.logMap[requestId];
    if (logs === undefined) {
      return {};
    }
    return logs;
  }
}
