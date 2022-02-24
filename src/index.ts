import { Plugin } from "vue";
import { getComponents } from "./get-components";

const plugin: Plugin = {
    install() {
        console.log("plugin installed", console.log(getComponents()));
    },
};

export default plugin;
