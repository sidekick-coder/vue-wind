import glob from 'fast-glob'
import path from "path";
import fs from "fs";
import lodash from 'lodash'

import { build } from 'vite';
import vue from "@vitejs/plugin-vue";

const files = glob.sync('components/**/*.vue')

const outDir = path.resolve(process.cwd(), 'dist')

if (fs.existsSync(outDir)) {
  fs.rmSync(outDir, { recursive: true })
}

const common = {
  plugins: [vue()],
  resolve: {
      alias: [{ find: "@", replacement: path.resolve(process.cwd(), "src") }],
  },
  build: {
    emptyOutDir: false,
    outDir,
    lib: {
      formats: ['es'],
    },
    rollupOptions: {
        external: ["vue"],
        output: {
            globals: {
                vue: "Vue",
            },
        },
    },
  },
}

await build(lodash.merge(common, {
  build: {
    lib: {
      entry: path.resolve(process.cwd(), 'src/index.ts'),
      fileName: 'index'
    }
  }
}))

for (const file of files) {
  
  await build(
    lodash.merge(common, {
      build: {
        lib: {
          entry: file,
          name: path.basename(file),
        },
        rollupOptions: {
          output: {
            assetFileNames: `components/[name].[ext]`,
            entryFileNames: () => 'components/[name].[format].js'
          },
        }
      }
    })
  )
}