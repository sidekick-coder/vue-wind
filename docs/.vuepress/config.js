const packageJSON = require('../../package.json')
const getComponentsDocs = require('./get-components-docs');
const path = require("path")

const sidebar = require("./sidebar");
const navbar = require("./navbar");

const componentsDocs = getComponentsDocs();

module.exports = {
    base: process.env.NODE_ENV === "production" ? "/vue-wind/" : "/",
    build: {
        assetsPublicPath: process.env.NODE_ENV === "production" ? "/vue-wind/" : "/",
    },
    title: packageJSON.name,
    description: packageJSON.description,
    head: [
        ['meta', { property: 'og:type', content: 'website' }],
        ['meta', { property: 'og:title', content: packageJSON.name }],
        ['meta', { property: 'og:description', content: packageJSON.description }],
        ['meta', { property: 'og:url', content: packageJSON.homepage }],
        ['meta', { property: 'og:site_name', content: packageJSON.name }],
        ['meta', { property: 'og:image', content: 'https://raw.githubusercontent.com/htron-dev/vue-wind/master/screenshots/vue-wind.jpg' }],
        ['meta', { property: 'og:image:with', content: '1024' }],
        ['meta', { property: 'og:image:height', content: '768' }],
    ],
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