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
    <w-data-table
        :items="items"
        :columns="columns"
        class="border"
    >
        

    </w-data-table>
</template>