<template>
    <w-card v-if="!components.length">
        Error component
    </w-card>
    <w-card v-else>
        <div class='flex'>
            <w-btn
                v-for='(component, index) in components'
                :key='index'
                color='teal-500'
                style='min-width:160px'
                @click='active = index'
                :text="index !== active"
            >
                {{component.name}}
            </w-btn>
        </div>
        <component-showcase-tabs
            v-if='components[active]'
            :component-options='components[active]' />
    </w-card>
</template>

<script>
import { upperFirst, camelCase } from 'lodash';

export default {
    props: {
        componentNames: {
            type: [String, Array, Object],
            required: true,
            default: () => []
        },
    },
    data () {
        return {
            components: [],
            active: 0,
        }
    },
    created(){
        this.load();
    },
    methods: {
        load (){

            if (Array.isArray(this.componentNames)) {
                this.setComponents(this.componentNames)
            } else if (typeof this.componentNames === "object") {
                this.addComponentViewObject(this.componentNames);
            } else if (typeof this.componentNames === "string") {
                this.addComponentViewString(this.componentNames)
            }
        },
        addComponentViewObject(component){
            const mainComponent = this.getComponentData(component.name, component.excludeProps);
            if (component.merge) {
                component.merge.forEach(c => {
                    const options = this.getComponentData(c, component.excludeProps);
                    mainComponent.props = Object.assign(mainComponent.props || {}, options.props);
                    mainComponent.events = Object.assign(mainComponent.events || {}, options.events);
                    mainComponent.methods = Object.assign(mainComponent.methods || {}, options.methods);
                })
            }
            this.components.push(mainComponent);
        },
        addComponentViewString(componentName){
            this.components.push(
                this.getComponentData(componentName)
            );
        },
        setComponents(components){
            components.forEach(component => {
                if (typeof component === 'string') {
                    this.addComponentViewString(component);
                } else {
                    this.addComponentViewObject(component);
                }
            });
        },
        getComponentData(componentName, excludeProps = []) {
            const globalName = upperFirst(camelCase(componentName));
            const componentData = this.$root.$options.components[globalName];
            if (!componentData) {
                return { name: componentName, props: {}, events: {} };
            }
            
            const { props, docs } = componentData.options;

            const component = {
                name: componentName,
                props: props ?? null,
                methods: docs ? docs.methods : null,
                excludeProps,
                events: docs ? docs.events : null
            }

            return component;
        },
    }
}
</script>