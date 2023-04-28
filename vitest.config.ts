import { defineConfig } from "vitest/config";

export default defineConfig({
  test: {
    setupFiles: ["./test/setup.ts"],
    testTimeout: 30 * 1000, // 30 seconds
    clearMocks: true,
  },
});
