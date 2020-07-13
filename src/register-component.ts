import { upperFirst, camelCase, uniq } from 'lodash';
import { VueConstructor } from 'vue';

const getComponentName = (filename: string) => {
    const name = upperFirst(
        camelCase(
            filename
                .replace(/^\.\//, '')
                .replace(/\.\w+$/, '')
                .replace('index', '')
        )
    );
    const duplicates = name.replace(/([a-z0-9])([A-Z])/g, '$1 $2').split(' ');

    if (duplicates.length > 1) {
        return uniq(duplicates).join('');
    }

    return duplicates.join('');
};

export default function registerComponents (Vue: VueConstructor, includeExamples = false) {
    const componentDirectoryContext = require.context('./components', true, /^(?!.*\.(spec|test)\.ts$).*\.(ts|vue)$/);

    const fileNames = componentDirectoryContext.keys();
    const componentsLoaded: string[] = [];

    fileNames.forEach((filename) => {
        const component = componentDirectoryContext(filename);

        const excludeKeys = ['types'];

        if (!includeExamples) {
            excludeKeys.push('docs-');
        }

        if (excludeKeys.some(v => filename.includes(v))) {
            return;
        }

        const componentName = getComponentName(filename);

        if (componentsLoaded.includes(componentName)) {
            return;
        }

        componentsLoaded.push(componentName);

        Vue.component(
            componentName,
            component.default || component
        );
    });
}
