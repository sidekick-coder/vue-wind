import { Plugin } from "vue";
import { getComponents } from "./get-components";

const plugin: Plugin = {
    install(app) {
        const components = getComponents();

        Object.entries(components).forEach(([name, component]) => {
            app.component(name, component);
        });
    },
};

export default plugin;
