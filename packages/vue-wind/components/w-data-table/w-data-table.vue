<script setup lang="ts">
import { useBuilder } from "../../composables/builder";
import { computed } from "vue";

interface TableColumn {
    name: string;
    label?: string;
    field?: string;
    style?: string;
}

const builder = useBuilder();

const props = defineProps({
    columns: {
        type: Array as () => TableColumn[],
        default: () => [],
    },
    items: {
        type: Array as () => any[],
        default: () => [],
    },
    loading: {
        type: Boolean,
        default: false,
    },
})

builder.add('w-full')

builder.createChild("tbody");

builder.createChild('cell').add('px-3 py-2 text-left border-b')

builder.createChild("th").add("font-bold");

builder.createChild("td")

builder.createChild("tr")


builder
    .createChild("loadingBar")
    .add("h-1 w-full animate-pulse bg-blue-500");
 
 const classes = computed(() => ({
    table: builder.make(),
    th: builder.makeChild('cell', 'th'),
    td: builder.makeChild('cell', 'td'),
    tr: builder.child("tr").make(),
    tbody: builder.child("tbody")
        .toggler("opacity-40", props.loading)
        .make(),
    loadingBar: builder.child("loadingBar").make(),
}));

</script>
<template>
    <table :class="classes.table">
        <thead>
            <tr>
                <slot name="column" :columns="columns">
                    <th
                        v-for="c in columns"
                        :class="classes.th"
                        :style="c.style"
                        :key="c.name"
                    >
                        <slot :name="`column-${c.name}`" :column="c">
                            {{ c.label }}
                        </slot>
                    </th>
                </slot>
            </tr>

            <tr v-if="loading">
                <td :colspan="columns.length" class="p-0">
                    <slot name="loading">
                        <div :class="classes.loadingBar"></div>
                    </slot>
                </td>
            </tr>
        </thead>

        <tbody :class="classes.tbody">
            <slot name="body-prepend" />

            <tr v-for="(item, y) in items" :key="y" :class="classes.tr">
                <slot
                    name="item"
                    :item="item"
                    :columns="columns"
                >
                    <td
                        v-for="(column, x) in columns"
                        :key="x"
                        :class="classes.td"
                    >
                        <slot
                            :name="`item-${column.name}`"
                            :column="column"
                            :item="item"
                            :value="column.field ? item[column.field] : ''"
                        >
                            {{ column.field ? item[column.field] : '' }}
                        </slot>
                    </td>
                </slot>
            </tr>

            <slot name="body-append" />
        </tbody>
    </table>
</template>
