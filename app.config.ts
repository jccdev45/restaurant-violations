import tsConfigPaths from "vite-tsconfig-paths";

// app.config.ts
import { defineConfig } from "@tanstack/start/config";

export default defineConfig({
  vite: {
    plugins: [
      tsConfigPaths({
        projects: ["./tsconfig.json"],
      }),
    ],
  },
});
