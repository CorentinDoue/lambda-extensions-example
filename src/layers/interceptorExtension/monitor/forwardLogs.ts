import fetch from "node-fetch";

export const forwardLogs = async (body: Record<string, unknown>) => {
  await fetch("https://webhook.site/1469839b-66ba-4267-a362-d9a54f018027", {
    method: "POST",
    body: JSON.stringify(body),
  });
};
