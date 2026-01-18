import { Worker as NodeWorker } from "node:worker_threads";
import { wrap } from "../../../dist/lib/comlink/index.js";

const worker = new NodeWorker(new URL(import.meta.resolve("./worker.js")));

const api = wrap(worker);
console.log(await api.add(6, 7));
