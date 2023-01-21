## arc-plugin-template

Baseline, boilerplate for an Architect plugin

A `src/cjs.js` and `src/esm.js` file are included to demonstrate both CommonJS and ES Modules, respectively.

Running this example as-is will create a folder in the project root when sandbox or deploy starts.

### Included stubs

- sandbox `start` and `end` functions
- sandbox `watcher` with event filter
- deploy `start` and `end` functions

### TODO

- `set` function that adds a Lambda handler fn
- `set` function that returns custom CloudFormation
- `hydrate.copy` function example
- GitHub Action to run tests
