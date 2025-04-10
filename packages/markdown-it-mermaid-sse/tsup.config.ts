import { defineConfig } from 'tsup'
import { compileCss } from './src/build'

export default defineConfig([
  {
    entry: ['src/index.ts'],
    format: ['esm'],
    dts: true,
    shims: true,
    terserOptions: {
      compress: true,
      keep_fnames: false
    },
    keepNames: false,
    async onSuccess() {
      await compileCss()
    },
  },
])
