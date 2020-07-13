<template>
    <w-card shadow='0' height='400px' class="flex min-h-full">
        <div class="flex flex-col border-r w-2/12 text-left">
            <template v-for='(tab, name) in tabs'>
                <w-btn
                    v-if="tab"
                    :key="name"
                    :text='name !== active'
                    :color='name === active ? "teal-500" : ""'
                    text
                    v-text="capitalize(name)"
                    @click='active = name'
                />
            </template>
        </div>
        <div class='w-full overflow-x-auto'>
            <div v-if='active === "props"'>
                <component-showcase-props :props-data='tabs.props' />
            </div>
            <div v-if='active === "events"'>
                <component-showcase-events :events-data='tabs.events' />
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
            active: 'props',
            capitalize,
            tabs: {
                props: null,
            },
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
            this.active = 'props';
            this.tabs.props = this.componentOptions.props || null;
            this.tabs.events = this.componentOptions.events || null;
        },
       
    }
}
</script>
