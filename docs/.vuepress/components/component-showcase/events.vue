<template>
    <div v-if="eventsData">
        <div
            v-for='(item, name, index) in eventsData'
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
        </div>
    </div> 
</template>

<script>
export default {
    props: {
        eventsData: {
            type: Object,
            required: true,
        }
    }
}
</script>
