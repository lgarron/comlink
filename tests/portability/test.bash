#!/usr/bin/env -S bash --

set -euo pipefail
set -x

# Change dirs so that the printed commands can be run from the project root.
cd "$(dirname "${0}")/../../"

"${@}" ./tests/portability/main.js | grep 'successfully finished'
"${@}" ./tests/portability/refCount-false.js | grep 'successfully timed out'
"${@}" ./docs/examples/06-node-example/main.js
"${@}" ./docs/examples/08-portable-worker/main.js
