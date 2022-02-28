import { startCase } from "lodash";

export function getComponents() {
    const files = import.meta.globEager("./components/**/*.vue");

    const components: Record<string, any> = {};

    Object.entries(files).forEach(([filename, component]) => {
        const name = startCase(
            filename.replace(/^.*[\\\/]/, "").replace(".vue", "")
        ).replace(/ /g, "");

        components[name] = component.default;
    });

    return components;
}
