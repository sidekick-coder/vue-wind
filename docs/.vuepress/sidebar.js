const getComponentsDocs = require('./get-components-docs');

const componentsDocs = getComponentsDocs();

const sidebarComponentsLinks = componentsDocs.map(c => ({
    title: c.frontmatter.componentName,
    path: c.path,
}));

module.exports = [
    {
        title: "Guide",
        children: [
            {
                title: "Getting start",
                path: "/guide/getting-start",
            },
            {
                title: "Icons",
                path: "/guide/icons",
            },
        ]
    },
    {
        title: "Components",
        children: sidebarComponentsLinks
    },
];