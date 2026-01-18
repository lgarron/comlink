import { Worker } from "node:worker_threads";
import { expect } from "chai";
import {
  createEndpoint,
  nodeEndpoint,
  releaseProxy,
  wrap,
} from "../../dist/lib/comlink/index.js";

describe("node", () => {
  describe("Comlink across workers", () => {
    beforeEach(function () {
      this.worker = new Worker(new URL(import.meta.resolve("./worker.js")));
    });

    afterEach(function () {
      this.worker.terminate();
    });

    it("can communicate", async function () {
      const proxy = wrap(nodeEndpoint(this.worker));
      expect(await proxy(1, 3)).to.equal(4);
    });

    it("can tunnels a new endpoint with createEndpoint", async function () {
      const proxy = wrap(nodeEndpoint(this.worker));
      const otherEp = await proxy[createEndpoint]();
      const otherProxy = wrap(otherEp);
      expect(await otherProxy(20, 1)).to.equal(21);
    });

    it("releaseProxy closes MessagePort created by createEndpoint", async function () {
      const proxy = wrap(nodeEndpoint(this.worker));
      const otherEp = await proxy[createEndpoint]();
      const otherProxy = wrap(otherEp);
      expect(await otherProxy(20, 1)).to.equal(21);

      await new Promise((resolve) => {
        otherEp.close = resolve; // Resolve the promise when the MessagePort is closed.
        otherProxy[releaseProxy](); // Release the proxy, which should close the MessagePort.
      });
    });
  });
});
