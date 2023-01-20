import { join } from 'path'
import { mkdirSync } from 'fs' // cannot use `node:*` prefix for now

function createConfig({ arc, inv }) {
  const { cwd: projectDir } = inv._project
  const { foo, bar, yeet } = Object.fromEntries(arc['my-plugin'] || [])

  return {
    foo: foo || 'default-foo',
    bar: bar || 'default-bar',
    yeet: yeet || 'default-yeet',
    projectDir,
  }
}

function go({ arc, inv }, production = false) {
  const { bar, yeet, projectDir } = createConfig({ arc, inv })

  // doSomethingWith(bar, yeet)

  // if (production) doSomethingElseWith(bar)

  // an example of creating something on disk
  mkdirSync(join(projectDir, yeet), { recursive: true })
}

function cleanup(params) {
  const { projectDir } = createConfig(params)

  //console.log(`cleanup: ${projectDir}`)
}

export const sandbox = {
  start({ arc, inventory }) {
    go({ arc, inv: inventory.inv })
  },
  end({ arc, inventory }) {
    cleanup({ arc, inv: inventory.inv })
  },
  watcher({ arc, filename, inventory }) {
    const { cwd } = inventory.inv._project
    const { foo } = createConfig({ arc, inv: inventory.inv })

    // test if watcher event matches a file we care about
    if (filename.indexOf(`${cwd}/${foo}`)) {
      go({ arc, inv: inventory.inv })
    }
  }
}

export const deploy = {
  start({ arc, inventory }) {
    const prod = true
    go({ arc, inv: inventory.inv }, prod)
  },
  end({ arc, inventory }) {
    cleanup({ arc, inv: inventory.inv })
  },
}
