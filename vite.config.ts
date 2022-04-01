import path from "path";
import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";

export default defineConfig({
    plugins: [vue()],
    resolve: {
        alias: [{ find: "@", replacement: path.resolve(__dirname, "src") }],
    },
    build: {
        lib: {
            entry: path.resolve(__dirname, "src", "index.ts"),
            name: "vue-wind",
            fileName: (format) => `index.${format}.js`,
            formats: ["es", "umd"],
        },
        rollupOptions: {
            external: ["vue"],
        },
    },
    test: {
        environment: "happy-dom",
        watch: false,
    },
});
