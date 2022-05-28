<script lang="ts">
import { useBuilder } from "@/composable/tailwind";
import { onKeyStroke } from "@vueuse/core";
import { defineComponent, computed, ref, onMounted } from "vue";

interface TableColumn {
    label: string;
    field: string;
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
        ...builder.child("td").props,
        columns: {
            type: Array as () => TableColumn[],
            default: () => [],
        },
        items: {
            type: Array as () => any[],
            default: () => [],
        },
        enableKeyboardNavigation: {
            type: Boolean,
            default: () => false,
        },
        tdAttrs: {
            type: Function as () => Record<string, any>,
            default: () => ({}),
        },
    },
    emits: ["focusItemCell", "focusItemRow", "selectItemRow", "selectItemCell"],
    setup(props, { emit }) {
        const tableRef = ref<HTMLTableElement>();

        const position = ref({
            x: 0,
            y: 0,
        });

        const rows = ref<HTMLElement[]>([]);
        const cells = ref<HTMLElement[]>([]);

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
                "Ctrl Enter": () => emit("selectItemRow", props.items[p.y]),
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
                Enter: () =>
                    emit("selectItemCell", {
                        item: props.items[p.y],
                        column: props.columns[p.x],
                    }),
            };

            if (!move[key]) return;

            move[key]();

            const cell = cellsMatrix.value[p.y][p.x];

            cell.focus();
        }

        function onFocusItemRow(y: number) {
            const item = props.items[y];

            emit("focusItemRow", {
                y,
                item,
            });
        }

        function onFocusItemCell(y: number, x: number) {
            const item = props.items[y];

            emit("focusItemCell", {
                x,
                y,
                item,
                column: props.columns[x],
            });
        }

        function onCLickItemRow(y: number) {
            const row = rows.value[y];

            position.value.y = y;

            row.focus();
        }

        function onClickItemCell(e: MouseEvent, y: number, x: number) {
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
                "Enter",
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

        if (props.enableKeyboardNavigation) {
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
        :tabindex="enableKeyboardNavigation ? '0' : undefined"
    >
        <thead>
            <tr>
                <th v-for="column in columns" :class="classes.th">
                    {{ column.label }}
                </th>
            </tr>
        </thead>

        <tbody>
            <tr
                v-for="(item, y) in items"
                :key="y"
                ref="rows"
                :tabindex="enableKeyboardNavigation ? '0' : undefined"
                :class="classes.tr"
                @focus="onFocusItemRow(y)"
            >
                <td
                    v-bind="tdAttrs"
                    v-for="(column, x) in columns"
                    :tabindex="enableKeyboardNavigation ? '0' : undefined"
                    :class="classes.td"
                    :key="x"
                    ref="cells"
                    @focus="onFocusItemCell(y, x)"
                    @mousedown="(e) => onClickItemCell(e, y, x)"
                >
                    {{ item[column.field] }}
                </td>
            </tr>
        </tbody>
    </table>
</template>
