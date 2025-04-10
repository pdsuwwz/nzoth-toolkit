import path from 'node:path'
import fs from 'fs-extra'
import glob from 'fast-glob'
import sass from 'sass'

export const compileCss = async () => {
  const scssFiles = await glob('src/**/*.scss')
  await Promise.all(
    scssFiles.map(async (file) => {
      const destPath = file.replace(/^src/, 'dist')
      const cssPath = destPath.replace(/\.scss$/, '.css')

      await fs.mkdir(path.dirname(destPath), { recursive: true })
      await fs.copyFile(file, destPath)

      const result = sass.compile(file, { style: 'expanded' })
      await fs.writeFile(cssPath, result.css)
    })
  )
}
