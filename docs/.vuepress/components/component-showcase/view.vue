<template>
    <w-card v-if="!components.length">
        Error component
    </w-card>
    <w-card v-else>
        <div class='border-b flex'>
            <w-btn
                v-for='(component, index) in components'
                :key='index'
                color='teal-500'
                style='min-width:160px'
                @click='active = index'
                :text="index !== active">
                {{component.name}}
            </w-btn>
        </div>
        <component-showcase-tabs
            v-if='components[active]'
            :component-options='components[active]' />
    </w-card>
</template>

<script>
export default {
    props: {
        componentNames: {
            type: [String, Array],
            required: true,
            default: () => []
        },
    },
    data () {
        return {
            components: [],
            active: null,
        }
    },
    created(){
        this.load();
    },
    methods: {
        load (){
            let names = [];
            
            if (typeof this.componentNames === "string") {
                names.push(this.componentNames);
            } else {
                names = this.componentNames;
            }
            
            this.setComponents(names);
        },
        setComponents(names){
            const components = [];
            names.forEach(name => {
                const componentData = this.$root.$options.components[name];
                if (componentData) {
                    components.push(this.getComponentData(componentData.options));
                }
            });
            if (components.length) {
                this.components = components;
                this.active = 0;
            }
        },
        getComponentData(componentOptions) {
            const { props, name, docs } = componentOptions;

            const component = {
                name,
                props,
                events: docs ? docs.events : null
            }

            return component;
        },
    }
}
</script>