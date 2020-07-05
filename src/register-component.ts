import upperFirst from 'lodash/upperFirst';
import camelCase from 'lodash/camelCase';
import { VueConstructor } from 'vue';

export default function registerComponents (Vue: VueConstructor, includeExamples = false) {
    const componentDirectoryContext = require.context('./components', true, /^(?!.*\.(spec|test)\.ts$).*\.(ts|vue)$/);

    const fileNames = componentDirectoryContext.keys();

    fileNames.forEach((fileName) => {
        const component = componentDirectoryContext(fileName);

        const excludeKeys = ['types'];

        if (!includeExamples) {
            excludeKeys.push('example');
        }

        if (excludeKeys.some(v => fileName.includes(v))) {
            return;
        }

        const componentName = upperFirst(
            camelCase(
                fileName
                    .replace(/^\.\//, '')
                    .replace(/\.\w+$/, '')
                    .replace('index', '')
            )
        );

        Vue.component(
            componentName,
            component.default || component
        );
    });
}
