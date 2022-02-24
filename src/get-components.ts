export function getComponents() {
    const files = import.meta.glob("./components/**/*.vue");

    const components: Record<string, any> = {};

    Object.entries(files).forEach(([filename, component]) => {
        const name = filename.replace(/^.*[\\\/]/, "").replace(".vue", "");

        components[name] = component;
    });

    return components;
}
