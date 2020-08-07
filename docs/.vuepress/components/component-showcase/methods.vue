<template>
    <div v-if="methodsData">
        <div
            v-for='(item, name, index) in methodsData'
            :key='name'
            :class='"grid grid-cols-12 text-left border-b py-2 px-3 last:border-b-0 overflow-y-auto"'
        >
            <span class="col-span-4">
                <span class='text-xs block text-gray-500'>Name</span>
                {{name}}
                <span v-if="item.description" class='text-xs block'>
                    {{item.description}}
                </span>
                <code v-if="item.returns">
                    {{name}}() => {{item.returns}}
                </code>
            </span>
        </div>
    </div> 
</template>

<script lang='ts'>
export default {
    props: {
        methodsData: {
            type: Object,
            required: true,
        }
    },
}
</script>
