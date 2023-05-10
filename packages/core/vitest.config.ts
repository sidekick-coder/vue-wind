import { defineConfig } from 'vitest/config'	

export default defineConfig({
    test: {
        reporters: 'verbose',
        cache: {
            dir: '.vitest'
        },
        watch: false,
    }
})