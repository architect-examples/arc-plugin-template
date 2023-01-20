import { existsSync, rmSync } from 'node:fs'
import { join } from 'node:path'
import test from 'tape'
import inventory from '@architect/inventory'
import { start, end } from '@architect/sandbox'

const here = join(process.cwd(), 'test')
const someArc = `
@app
test-arc-app

@plugins
arc-plugin-my-plugin
  src ../src/esm.mjs # <-- note the esm.mjs

@my-plugin
foo some option
yeet the-yeet-folder
`

test('esm sandbox integration', async (t) => {
  const inv = await inventory({ rawArc: someArc, cwd: here }, null)
  t.ok(inv, 'inv ok')

  // start sandbox with inv
  await start({
    inventory: inv,
    quiet: true,
  })

  // check for expected files
  t.ok(existsSync(join(here, 'the-yeet-folder')), 'the-yeet-folder folder exists')

  // stop sandbox
  await end()
  // cleanup
  rmSync(join(here, 'public'), { recursive: true, force: true })
  t.end()
})
