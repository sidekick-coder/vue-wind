<script setup lang="ts">
import { PropType } from "vue";

interface Column {
    label: string;
    field: string;
}

defineProps({
    columns: {
        type: Array as PropType<Column[]>,
        default: () => [],
    },
    items: {
        type: Array as PropType<any[]>,
        default: () => [],
    },
});
</script>
<template>
    <table class="w-full border drop-shadow bg-white">
        <thead>
            <tr>
                <th v-for="column in columns" class="bg-gray-100 p-2 text-left">
                    {{ column.label }}
                </th>
            </tr>
        </thead>

        <tbody>
            <tr v-for="(item, index) in items" :key="index">
                <td v-for="column in columns" class="p-2 text-left border-b">
                    {{ item[column.field] }}
                </td>
            </tr>
        </tbody>
    </table>
</template>
