import upperFirst from "lodash/upperFirst";
import camelCase from "lodash/camelCase";
import { VueConstructor } from "vue";


export default function registerComponents (Vue: VueConstructor) {

    const componentDirectoryContext = require.context("./components", true, /\.(vue|ts)$/);

    const fileNames = componentDirectoryContext.keys();
    
    fileNames.forEach((fileName) => {
        const component = componentDirectoryContext(fileName);
    
        const componentName = upperFirst(
            camelCase(
                fileName
                    .replace(/^\.\//, "")
                    .replace(/\.\w+$/, "")
                    .replace("index", "")
            )
        );

        Vue.component(
            componentName,
            component.default || component
        );
    });
}
