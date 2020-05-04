const packageJSON = require('../../package.json')

module.exports = {
    base: process.env.NODE_ENV === "production" ? "/docs/" : "/",
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
        ],
    },
