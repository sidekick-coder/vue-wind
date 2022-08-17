<script setup lang="ts">

const items = []
const columns = [
    { name: 'id', field: 'id', label: '#' },
    { name: 'title', field: 'title', label: 'Title' },
    { name: 'date', field: 'date', label: 'Date' },
]

for (let i = 0; i < 10; i++) {
    items.push({
        id: i,
        title: `Article ${i}`,
        date: `2022-01-2${i}`,
    })
}

</script>

<template>
    <w-data-table :items="items" :columns="columns" class="border">
        <template #item-date="{ value }">
            <div class="bg-teal-500 text-white rounded-full px-2 text-center w-[100px]">
                {{ value }}
            </div>
        </template>

    </w-data-table>
</template>