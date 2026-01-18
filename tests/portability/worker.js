import { expose } from "../../dist/lib/comlink/index.js";

const api = {
  add(a, b) {
    return a + b;
  },
};

expose(api);
