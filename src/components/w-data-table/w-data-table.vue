<script lang="ts">
import { useBuilder } from "@/composable/tailwind";
import { PropType, defineComponent, computed } from "vue";

interface TableColumn {
    label: string;
    field: string;
}

export const builder = useBuilder();

builder.static("w-full border drop-shadow").option("color", "bg", "white");

export default defineComponent({
    props: {
        ...builder.props,
        columns: {
            type: Array as PropType<TableColumn[]>,
            default: () => [],
        },
        items: {
            type: Array as PropType<any[]>,
            default: () => [],
        },
    },
    setup(props) {
        return {
            classes: computed(() => builder.make(props)),
        };
    },
});
</script>

<template>
    <table :class="classes">
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
