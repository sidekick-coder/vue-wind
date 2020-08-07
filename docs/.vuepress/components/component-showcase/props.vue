<template>
    <div v-if="propsOptions" class="w-full">
        <template v-for='(item, name, index) in propsOptions'>
            <div
                v-if="!excludeProps.includes(name)"
                :key='name'
                :class='"grid grid-cols-12 text-left border-b py-2 px-3 last:border-b-0 overflow-y-auto"'
            >

                <span class="col-span-4">
                    <span class='text-xs block text-gray-500'>Name</span>
                    {{name}}
                    <span class='text-xs block'>
                        {{item.description}}
                    </span>
                </span>
                <span class="col-span-3">
                    <span class='text-xs block text-gray-500'>Type</span>
                    {{item.type ? getPropTypeName(item.type) : item.type}}
                </span>
                <span class="col-span-5 text-xs">
                    <span class='text-xs block text-gray-500'>Default</span>
                    {{getPropDefaultValues(item.default)}}
                </span>
            </div>
        </template>
    </div> 
</template>

<script>
export default {
    props: {
        propsOptions: {
            type: Object,
            required: true,
        },
        excludeProps: {
            type: Array,
            required: false,
            default: () => []
        },
    },
    methods: {
        getPropTypeName(type) {
            if (!type) return
            
            if (Array.isArray(type)) {
                return type.map(t => this.getPropTypeName(t)).join(' | ');
            }

            return typeof type();

        },
        getPropDefaultValues(value) {
            if (typeof value === 'function') {
                return value();
            }

            return value || 'undefiend';
        },
    }
}
</script>

<style>

</style>