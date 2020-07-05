import registerComponents from "./../../src/register-component";

export default ({ Vue }, ctx) => {
    registerComponents(Vue, true);
}