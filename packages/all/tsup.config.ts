import { defineConfig } from 'tsup'

export default defineConfig([
  {
    entry: ['src/index.ts'],
    format: ['esm'],
    clean: true,
    dts: true,
    minify: true,
    shims: true,
    terserOptions: {
      compress: true,
      keep_fnames: false
    },
    keepNames: false,
  },
])
