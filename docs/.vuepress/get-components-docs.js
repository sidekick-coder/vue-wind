const path = require("path");
const glob = require("glob");

const getComponentsDocs = () => {
    const dirname = path.resolve(__dirname, "..", "..", "src", "components");
    const components = [];
    const folders = glob.sync(`${dirname}/*`);
    folders.forEach(folder => {
        const [markDownFile] = glob.sync(`${folder}/documentation.md`);
        const componentName = path.basename(folder).replace("w-", "");
        
        if (!markDownFile) {
            return;
        }

        components.push({
            path: `/components/${componentName}.html`,
            filePath: markDownFile,
            frontmatter: {
                componentName,
            }
        });

    });

    return components;
}
module.exports = getComponentsDocs;