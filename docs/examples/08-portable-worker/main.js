import { PortableWorker, wrap } from "../../../dist/lib/comlink/index.js";

const worker = new PortableWorker(import.meta.resolve("./worker.js"));
const api = wrap(worker);

// Single call
console.log(await api.add(6, 7));

// Interleaved calls
console.log(
  await Promise.all([api.add(4, 5), api.add(6, 7), api.add(100, -5)]),
);
