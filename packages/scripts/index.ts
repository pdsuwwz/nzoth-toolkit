import fs from 'fs/promises'
import path from 'path'
import glob from 'fast-glob'
import { fileURLToPath } from 'url'
import postcss from 'postcss'
import cssnano from 'cssnano'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

const PACKAGES_DIR = path.resolve(__dirname, '../../packages')
const OUTPUT_DIR = path.resolve(PACKAGES_DIR, 'all/dist/styles');

const run = async () => {
  const pkgDirs = await fs.readdir(PACKAGES_DIR)
  const scssImports: string[] = []
  const cssContents: string[] = []

  await fs.mkdir(OUTPUT_DIR, { recursive: true })

  for (const pkgName of pkgDirs) {
    if (pkgName === 'all') continue

    const styleDir = path.join(PACKAGES_DIR, pkgName, 'dist/styles')
    const exists = await fs.stat(styleDir).then(() => true).catch(() => false)
    if (!exists) continue

    const files = await glob(['*.css', '*.scss'], { cwd: styleDir })

    for (const file of files) {
      const src = path.join(styleDir, file)
      
      const suffix = file.split('.').slice(1).join('.')
      const fileName = `${pkgName}.${suffix}`

      const dest = path.join(OUTPUT_DIR, fileName)

      await fs.copyFile(src, dest)

      if (file.endsWith('.scss')) {
        scssImports.push(`@use "./${fileName}"`)
      }

      if (file.endsWith('.css')) {
        const css = await fs.readFile(src, 'utf-8')
        cssContents.push(css)
      }
    }
  }

  const indexScss = scssImports.join('\n')
  await fs.writeFile(path.join(OUTPUT_DIR, 'index.scss'), indexScss)

  const combinedCss = cssContents.join('\n\n')
  const minified = await postcss([cssnano]).process(combinedCss, { from: undefined })
  await fs.writeFile(path.join(OUTPUT_DIR, 'index.min.css'), minified.css)
}

run()
  .catch((err) => {
    console.error(err)
    process.exit(1)
  })
