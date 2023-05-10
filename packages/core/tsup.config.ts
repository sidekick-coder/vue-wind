import { defineConfig } from 'tsup'
import path from 'path'
import fg from 'fast-glob'
import fs from 'fs'


export default defineConfig({
    entry: [path.resolve(__dirname, 'src/cli.ts')],
    splitting: false,
    sourcemap: true,
    clean: true,
    dts: true,
    format: ['esm', 'cjs'],
    tsconfig: path.resolve(__dirname, 'tsconfig.json'),
    external: [
        '@vue-wind/composables',
        '@vue-wind/components',
    ]
})