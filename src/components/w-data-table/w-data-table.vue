<script lang="ts">
import { useBuilder } from "@/composable/tailwind";
import { onKeyStroke, useVModel } from "@vueuse/core";
import { defineComponent, computed, ref, onMounted } from "vue";

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

export default defineComponent({
    props: {
        ...builder.props,
        ...builder.child("tr").props,
        ...builder.child("td").props,
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
        // selected item
        item: {
            type: Object as any,
            default: null,
        },
        // selected column
        column: {
            type: Object as any,
            default: null,
        },
        enableNavigation: {
            type: Boolean,
            default: () => false,
        },
        navigationCellSelector: {
            type: String,
            default: null,
        },
    },
    emits: ["update:item", "update:column"],
    setup(props, { emit }) {
        const tableRef = ref<HTMLTableElement>();

        const position = ref({
            x: 0,
            y: 0,
        });

        const rows = ref<HTMLElement[]>([]);
        const cells = ref<HTMLElement[]>([]);

        const item = useVModel(props, "item", emit);
        const column = useVModel(props, "column", emit);

        const cellsMatrix = computed(() => {
            const matrix: HTMLElement[][] = [];

            cells.value.forEach((cell, index) => {
                if (index % props.columns.length === 0) {
                    matrix.push([]);
                }

                matrix[matrix.length - 1].push(cell);
            });

            return matrix;
        });

        const classes = computed(() => ({
            main: builder.make(props),
            th: builder.child("th").make(props),
            td: builder.child("td").make(props),
            tr: builder.child("tr").make(props),
        }));

        function moveRow(key: string) {
            const p = position.value;

            const maxY = props.items.length;

            const move: any = {
                "Ctrl ArrowUp": () => (p.y = Math.max(0, p.y - 1)),
                "Ctrl ArrowDown": () => (p.y = Math.min(p.y + 1, maxY - 1)),
                "Ctrl Enter": () => (item.value = props.items[p.y]),
            };

            if (!move[key]) return;

            move[key]();

            const row = rows.value[p.y];

            row.focus();
        }

        function moveCell(key: string) {
            const p = position.value;

            const maxY = props.items.length;
            const maxX = props.columns.length;

            const move: any = {
                ArrowUp: () => (p.y = Math.max(0, p.y - 1)),
                ArrowDown: () => (p.y = Math.min(p.y + 1, maxY - 1)),
                ArrowLeft: () => (p.x = Math.max(0, p.x - 1)),
                ArrowRight: () => (p.x = Math.min(p.x + 1, maxX - 1)),
                Enter: () => (column.value = props.columns[p.x]),
            };

            if (!move[key]) return;

            move[key]();

            const cell = cellsMatrix.value[p.y][p.x];

            cell.focus();
        }

        function onFocusItemRow(y: number) {
            const row = props.items[y];

            item.value = row;
        }

        function onFocusItemCell(y: number, x: number) {
            item.value = props.items[y];
            column.value = props.columns[x];

            if (!props.navigationCellSelector) return;

            const cell = cellsMatrix.value[y][x];

            cell.querySelector<HTMLElement>(
                props.navigationCellSelector
            )?.focus();
        }

        function onCLickItemRow(y: number) {
            const row = rows.value[y];

            position.value.y = y;

            row.focus();
        }

        function onClickItemCell(e: MouseEvent, y: number, x: number) {
            if (!props.enableNavigation) return;

            e.preventDefault();

            if (e.ctrlKey) {
                onCLickItemRow(y);
                return;
            }

            const cell = cellsMatrix.value[y][x];

            position.value.x = x;
            position.value.y = y;

            cell.focus();
        }

        function setNavigationEvents() {
            if (!tableRef.value) {
                console.error("Error loading events");
                return;
            }
            const cellKeys = [
                "ArrowUp",
                "ArrowDown",
                "ArrowLeft",
                "ArrowRight",
            ];

            cellKeys.forEach((key) => {
                onKeyStroke(
                    key,
                    (e) => {
                        e.preventDefault();
                        let name = key;

                        if (e.ctrlKey) {
                            name = "Ctrl " + name;
                        }

                        const move = name.includes("Ctrl") ? moveRow : moveCell;

                        move(name);
                    },
                    { target: tableRef.value }
                );
            });
        }

        if (props.enableNavigation) {
            onMounted(setNavigationEvents);
        }

        return {
            rows,
            classes,
            tableRef,
            position,
            cellsMatrix,
            cells,
            onFocusItemRow,
            onCLickItemRow,
            onFocusItemCell,
            onClickItemCell,
        };
    },
});
</script>

<template>
    <table
        ref="tableRef"
        :class="classes.main"
        :tabindex="enableNavigation ? '0' : undefined"
    >
        <thead>
            <tr>
                <th
                    v-for="c in columns"
                    :class="classes.th"
                    :style="c.style"
                    :key="c.name"
                >
                    {{ c.label }}
                </th>
            </tr>
        </thead>

        <tbody>
            <tr
                v-for="(item, y) in items"
                :key="y"
                ref="rows"
                :tabindex="enableNavigation ? '0' : undefined"
                :class="classes.tr"
                @focus="onFocusItemRow(y)"
            >
                <slot
                    name="item"
                    :item="item"
                    :columns="columns"
                    :select="() => onFocusItemRow(y)"
                >
                    <td
                        v-bind="tdAttrs"
                        v-for="(column, x) in columns"
                        :key="x"
                        :tabindex="enableNavigation ? '0' : undefined"
                        :class="classes.td"
                        ref="cells"
                        @focus="onFocusItemCell(y, x)"
                        @mousedown="onClickItemCell($event, y, x)"
                    >
                        <slot
                            :name="`item-${column.name}`"
                            :column="column"
                            :item="item"
                            :select="() => onFocusItemCell(y, x)"
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
