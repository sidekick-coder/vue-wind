import { Plugin } from "vue";
import { useBuilder as composable } from "./composable/tailwind";
import { getComponents } from "./get-components";
import { VWindTransformer } from "./tailwind-transform";

const plugin: Plugin = {
    install(app) {
        const components = getComponents();

        Object.entries(components).forEach(([name, component]) => {
            app.component(name, component);
        });
    },
};

export function useVueWind() {
    return plugin;
}

export const transformer = VWindTransformer;

export const useBuilder = composable;
