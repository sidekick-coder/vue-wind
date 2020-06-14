const getSubdirectoriesNames = require("./utils");
const packageJSON = require('../../package.json')
const path = require("path");

const componentsDocs = getSubdirectoriesNames(
    path.resolve(__dirname, "../components-ui/")
).map(file => `/components-ui/${file}`);

module.exports = {
    base: process.env.NODE_ENV === "production" ? "/vue-wind/" : "/",
    title: packageJSON.name,
    description: packageJSON.description,
    themeConfig: {
        logo: '/images/vue-wind-2.svg',
        sidebarDepth: 0,
        nextLinks: false,
        prevLinks: false,
        nav: [
            {
                text: "Home",
                link: "/"
            },
            {
                text: "Getting start",
                link: "/guide/getting-start"
            },
            {
                text: "Github",
                link: "https://github.com/htron-dev/vue-wind"
            },
        ],
        sidebar: [
            {
                title: "Guide",
                children: [
                    {
                        title: "Getting start",
                        path: "/guide/getting-start",
                    }
                ]
            },
            {
                title: "Components",
                children: componentsDocs
            },
        ],
    },
    plugins: [
        [
            'vuepress-plugin-typescript',
            'register-components',
            {
                componentsDir: "../../src/components"
            }
        ]
    ],
    chainWebpack(config) {
        config.resolve.extensions.add(".ts");
    }
};