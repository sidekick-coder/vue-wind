import { defineConfig } from 'vitest/config'	
import { mergeConfig } from 'vitest/config'
import vue from '@vitejs/plugin-vue'

export default defineConfig({
    plugins: [vue()],
    test: {
        reporters: 'verbose',
        cache: {
            dir: '.vitest'
        },
        watch: false,
    }
})