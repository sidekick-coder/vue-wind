const packageJSON = require('../../package.json')
const getComponentsDocs = require('./get-components-docs');
const path = require("path")

const sidebar = require("./sidebar");
const navbar = require("./navbar");

const componentsDocs = getComponentsDocs();

const sidebarComponentsLinks = componentsDocs.map(c => ({
    title: c.frontmatter.componentName,
    path: c.path,
}));

module.exports = {
    base: process.env.NODE_ENV === "production" ? "/vue-wind/" : "/",
    build: {
        assetsPublicPath: process.env.NODE_ENV === "production" ? "/vue-wind/" : "/",
    },
    title: packageJSON.name,
    description: packageJSON.description,
    async additionalPages(){
        return componentsDocs;
    },
    themeConfig: {
        logo: '/images/vue-wind-2.svg',
        sidebarDepth: 0,
        nextLinks: false,
        prevLinks: false,
        nav: navbar,
        sidebar,
    },
    plugins: [
        [
            'vuepress-plugin-typescript',
            {
                tsLoaderOptions: {
                    transpileOnly: true,
                    compilerOptions: {}
                },
            },
            'register-components',
            {
                componentsDir: "../../src/components"
            },
        ],
    ],
    postcss: {
        plugins: [
            require('tailwindcss')(path.resolve(__dirname, './tailwind.config.js')),
            require('autoprefixer')
        ],
    },
    chainWebpack(config) {
        config.resolve.extensions.add(".ts");
    }
};