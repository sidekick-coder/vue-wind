import { Plugin } from "vue";
import components from "./components";

const plugin: Plugin = {
    install(app) {
        Object.entries(components).forEach(([name, component]) => {
            app.component(name, component);
        })
    },
};

export function createVWind() {
    return plugin;
}
