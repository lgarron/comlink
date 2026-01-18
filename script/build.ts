import { es2022Lib } from "@cubing/dev-config/esbuild/es2022";
import { build } from "esbuild";
import { sync as rimrafSync } from "rimraf";

const outdir = "./dist/lib/comlink/";

// TODO: async
rimrafSync(outdir);

await build({
  ...es2022Lib(),
  entryPoints: ["./src/index.ts"],
  outdir,
});
