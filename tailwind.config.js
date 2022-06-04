const { transformer } = require("vue-wind");
module.exports = {
    theme: {},
    content: {
        files: [
            "./src/components/**/*.stories.ts",
            "./src/components/**/*.vue",
        ],
        transform: {
            ts: (content) => {
                const vWindSafeList = transformer(content);

                return [vWindSafeList, content].join("\n\n\n");
            },
        },
    },
    safelist: [
        {
            pattern: /bg-*/,
            variants: ["focus", "placeholder-shown", "hover"],
        },
        {
            pattern: /text-*/,
            variants: ["focus", "placeholder-shown", "hover"],
        },
        {
            pattern: /border-*/,
            variants: ["focus", "placeholder-shown", "hover"],
        },
    ],
    plugins: [],
};
