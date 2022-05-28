const { transformer } = require("vue-wind");
module.exports = {
    theme: {},
    content: {
        files: ["./src/components/**/*.stories.ts"],
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
            variants: ["focus"],
        },
        {
            pattern: /text-*/,
        },
    ],
    plugins: [],
};
