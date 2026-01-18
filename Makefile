.PHONY: build
build: build-js build-types

.PHONY: build-js
build-js: setup
	bun run -- ./script/build.ts

.PHONY: build-types
build-types: setup
	bun x -- bun-dx --package typescript tsc -- --project ./tsconfig.types.json

.PHONY: check
check: lint test build check-package.json

.PHONY: setup
setup:
	bun install --frozen-lockfile

.PHONY: lint
lint: setup
	bun x -- bun-dx --package @biomejs/biome biome -- check
	bun x -- bun-dx --package typescript tsc -- --project ./tests/tsconfig.json

.PHONY: format
format: setup
	bun x -- bun-dx --package @biomejs/biome biome -- check --write

.PHONY: test
test: test-portability test-unit test-node

.PHONY: test-unit
test-unit: build-js
	npx -- karma start

.PHONY: test-unit-watch
test-unit-watch: build-js
	CHROME_ONLY=1 npx -- karma start --no-single-run

.PHONY: test-node
test-node: build-js
	npx -- mocha ./tests/node/main.js

.PHONY: test-portability
test-portability: test-portability-node test-portability-bun test-portability-deno

.PHONY: test-portability-node
test-portability-node: build-js
	./tests/portability/test.bash node --

.PHONY: test-portability-bun
test-portability-bun: build-js
	./tests/portability/test.bash npx -- bun run --

.PHONY: test-portability-deno
test-portability-deno: build-js
	./tests/portability/test.bash npx -- deno run --allow-read --

.PHONY: check-package.json
check-package.json: build
	bun x -- bun-dx --package @cubing/dev-config package.json -- check

.PHONY: prepublishOnly
prepublishOnly: lint test build

RM = bun -e 'process.argv.slice(1).map(p => process.getBuiltinModule("node:fs").rmSync(p, {recursive: true, force: true, maxRetries: 5}))' --

.PHONY: clean
clean:
	${RM} ./dist/

.PHONY: reset
reset: clean
	${RM} ./node_modules/
