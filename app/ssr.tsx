import { getRouterManifest } from "@tanstack/start/router-manifest";
// app/ssr.tsx
import {
  createStartHandler,
  defaultStreamHandler,
} from "@tanstack/start/server";

import { createRouter } from "./router";

export default createStartHandler({
  createRouter,
  getRouterManifest,
})(defaultStreamHandler);
