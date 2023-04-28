import path from "path";

import { syncTestEnvVars } from "@swarmion/integration-tests";

// @ts-ignore
await syncTestEnvVars({
  cacheFilePath: path.resolve(__dirname, "./testEnvVarsCache.json"),
});
