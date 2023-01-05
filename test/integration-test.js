const { existsSync, rmSync } = require('node:fs')
const { join } = require('node:path')
const test = require('tape')
const inventory = require('@architect/inventory')
const sandbox = require('@architect/sandbox')

const here = join(process.cwd(), 'test')
const someArc = `
@app
test-arc-app

@plugins
arc-plugin-my-plugin
  src ../src/index.js

@my-plugin
foo some option
bar public/style.css
`

test('sandbox', async (t) => {
  const inv = await inventory({ rawArc: someArc, cwd: here }, null)
  t.ok(inv, 'ok')

  // start sandbox with inv
  await sandbox.start({
    inventory: inv,
    quiet: true,
  })

  // check for expected files
  t.ok(existsSync(join(here, 'public', 'style.css')), 'public/style.css exists')

  // stop sandbox
  await sandbox.end()
  // cleanup
  rmSync(join(here, 'public'), { recursive: true, force: true })
  t.end()
})
