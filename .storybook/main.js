const { resolve } = require("path");
const { loadConfigFromFile, mergeConfig } = require("vite");

module.exports = {
    stories: [
        "../src/**/*.stories.mdx",
        "../src/**/*.stories.@(js|jsx|ts|tsx)",
        "../src/components/**/*.stories.@(js|jsx|ts|tsx)",
    ],
    addons: ["@storybook/addon-links", "@storybook/addon-essentials"],
    framework: "@storybook/vue3",
    core: {
        builder: "storybook-builder-vite",
    },
    async viteFinal(config) {
        const { config: userConfig } = await loadConfigFromFile(
            resolve(__dirname, "..", "vite.config.ts")
        );

        return mergeConfig(config, {
            ...userConfig,
            // manually specify plugins to avoid conflict
            plugins: [],
        });
    },
};
