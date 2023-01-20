import test from 'tape'
import { sandbox, deploy } from '../src/esm.mjs'

test('esm interface', (assert) => {
  assert.equal(typeof sandbox.start, 'function', 'sandbox start is a function')
  assert.equal(typeof sandbox.end, 'function', 'sandbox end is a function')
  assert.equal(typeof sandbox.watcher, 'function', 'sandbox watcher is a function')
  assert.equal(typeof deploy.start, 'function', 'deploy start is a function')
  assert.equal(typeof deploy.end, 'function', 'deploy end is a function')
  assert.end()
})
