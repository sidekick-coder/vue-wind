import path from "path";
import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";

export default defineConfig({
    plugins: [vue()],
    build: {
        lib: {
            entry: path.resolve(__dirname, "src", "index.ts"),
            name: "vue-wind",
            fileName: (format) => `index.${format}.js`,
            formats: ["es"],
        },
        rollupOptions: {
            external: ["vue"],
        },
    },
    test: {
        environment: "happy-dom",
    },
});
