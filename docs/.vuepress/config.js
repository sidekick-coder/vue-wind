const packageJSON = require('../../package.json')
const getComponentsDocs = require('./get-components-docs');

const componentsDocs = getComponentsDocs();

const sidebarComponentsLinks = componentsDocs.map(c => ({
    title: c.frontmatter.componentName,
    path: c.path,
}));

module.exports = {
    base: process.env.NODE_ENV === "production" ? "/vue-wind/" : "/",
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
                children: sidebarComponentsLinks
            },
        ],
    },
    plugins: [
        [
            'vuepress-plugin-typescript',
            'register-components',
            {
                componentsDir: "../../src/components"
            },
        ],
    ],
    postcss: {
        plugins: [require('tailwindcss')('./tailwind.config.js'), require('autoprefixer')],
    },
    chainWebpack(config) {
        config.resolve.extensions.add(".ts");
    }
};