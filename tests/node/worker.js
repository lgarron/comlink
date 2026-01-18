import { parentPort } from "node:worker_threads";
import { expose, nodeEndpoint } from "../../dist/lib/comlink/index.js";

expose((a, b) => a + b, nodeEndpoint(parentPort));
