const test = require('tape')
const { sandbox, deploy } = require('../src/cjs')

test('cjs interface', (t) => {
  t.equal(typeof sandbox.start, 'function', 'sandbox start is a function')
  t.equal(typeof sandbox.end, 'function', 'sandbox end is a function')
  t.equal(typeof sandbox.watcher, 'function', 'sandbox watcher is a function')
  t.equal(typeof deploy.start, 'function', 'deploy start is a function')
  t.equal(typeof deploy.end, 'function', 'deploy end is a function')
  t.end()
})
