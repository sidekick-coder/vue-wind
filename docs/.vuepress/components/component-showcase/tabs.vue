<template>
    <w-card shadow='0' height='400px' class="flex min-h-full">
        <div class="flex flex-col border-r w-2/12 text-left">
            <template v-for='(tab, name) in tabs'>
                <w-btn
                    v-if="componentOptions[name]"
                    :key="name"
                    :text='name !== active'
                    :color='name === active ? "teal-500" : ""'
                    text
                    v-text="capitalize(name)"
                    @click='active = name'
                    class="text-left"
                />
            </template>
        </div>
        <div class='w-full overflow-x-auto  border-t'>
            <div v-if='active === "props"'>
                <component-showcase-props :props-options='tabs.props' :exclude-props='componentOptions.excludeProps' />
            </div>
            <div v-if='active === "events"'>
                <component-showcase-events :events-data='tabs.events' />
            </div>
            <div v-if='active === "methods"'>
                <component-showcase-methods :methods-data='tabs.methods' />
            </div>
        </div>
    </w-card>
</template>

<script>
import { capitalize } from 'lodash';

export default {
    props: {
        componentOptions: {
            type: Object,
            required: true,
            default: () => ({})
        }
    },
    data(){
        return {
            active: null,
            capitalize,
            tabs: {},
        };
    },
    watch: {
        componentOptions: {
            immediate: true,
            handler: 'load'
        }
    },
    methods: {
        load(){
            const { props, events, methods }  = this.componentOptions;
            if (this.haveData(props)) {
                this.tabs.props = this.componentOptions.props;
            }
            if (this.haveData(events)) {
                this.tabs.events = this.componentOptions.events;
            }
            
            if (this.haveData(methods)) {
                this.tabs.methods = this.componentOptions.methods;
            }
            
            this.active = Object.keys(this.tabs)[0];
        },
        haveData(value){
            if (!value) {
                return false;
            }

            if (!Object.keys(value).length) {
                return false;
            }

            return true;
        }
       
    }
}
</script>
