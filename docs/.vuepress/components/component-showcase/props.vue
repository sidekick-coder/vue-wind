<template>
    <div v-if="propsData" class="w-full">
        <div
            v-for='(item, name, index) in propsData'
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
                {{getPropTypeName(item.type)}}
            </span>
            <span class="col-span-5 text-xs">
                <span class='text-xs block text-gray-500'>Default</span>
                {{getPropDefaultValues(item.default)}}
            </span>
        </div>
    </div> 
</template>

<script>
export default {
    props: {
        propsData: {
            type: Object,
            required: true,
        }
    },
    methods: {
        getPropTypeName(type) {
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