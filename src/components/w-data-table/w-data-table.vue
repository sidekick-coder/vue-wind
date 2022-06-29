<script lang="ts">
import { useBuilder } from "@/composable/tailwind";
import { defineComponent, computed, ref } from "vue";

interface TableColumn {
    name: string;
    label: string;
    field: string;
    style?: string;
}

export const builder = useBuilder();

builder.option("width", "w", "full").static("focus:outline-none");

builder
    .child("th")
    .option("thColor", "text", "gray-500")
    .option("borderColor", "border", "gray-200")
    .static("p-2 text-left border-b");

builder
    .child("tr")
    .option("focusColor", "focus:bg", "gray-100")
    .static("outline-none");

builder
    .child("td")
    .option("tdColor", "text", "gray-500")
    .option("focusColor", "focus:bg", "gray-100")
    .option("borderColor", "border", "gray-200")
    .static("p-2 text-left border-b outline-none");

builder.child("tbody").toggle("loading", "opacity-30");

builder
    .child("loadingBar")
    .option("loadingBarColor", "bg", "gray-500")
    .static("h-1 w-full animate-pulse");

export default defineComponent({
    props: {
        ...builder.props,
        ...builder.child("tr").props,
        ...builder.child("td").props,
        ...builder.child("loadingBar").props,
        columns: {
            type: Array as () => TableColumn[],
            default: () => [],
        },
        items: {
            type: Array as () => any[],
            default: () => [],
        },
        tdAttrs: {
            type: Function as () => Record<string, any>,
            default: () => ({}),
        },
        loading: {
            type: Boolean,
            default: false,
        },
    },
    setup(props) {
        const tableRef = ref<HTMLTableElement>();

        const position = ref({
            x: 0,
            y: 0,
        });

        const rows = ref<HTMLElement[]>([]);
        const cells = ref<HTMLElement[]>([]);

        const classes = computed(() => ({
            main: builder.make(props),
            th: builder.child("th").make(props),
            td: builder.child("td").make(props),
            tr: builder.child("tr").make(props),
            tbody: builder.child("tbody").make(props),
            loadingBar: builder.child("loadingBar").make(props),
        }));

        return {
            rows,
            classes,
            tableRef,
            position,
            cells,
        };
    },
});
</script>

<template>
    <table ref="tableRef" :class="classes.main">
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
                <slot name="item" :item="item" :columns="columns">
                    <td
                        v-bind="tdAttrs"
                        v-for="(column, x) in columns"
                        :key="x"
                        :class="classes.td"
                    >
                        <slot
                            :name="`item-${column.name}`"
                            :column="column"
                            :item="item"
                        >
                            {{ item[column.field] }}
                        </slot>
                    </td>
                </slot>
            </tr>

            <slot name="body-append" />
        </tbody>
    </table>
</template>
