import fetch from "node-fetch";
import { FAKE_MONITORING_SERVICE_URL } from "../../../urls";

export const forwardLogs = async (body: Record<string, unknown>) => {
  console.log("forwarding logs to monitoring service", JSON.stringify(body));
  await fetch(FAKE_MONITORING_SERVICE_URL, {
    method: "POST",
    body: JSON.stringify(body),
  });
};
