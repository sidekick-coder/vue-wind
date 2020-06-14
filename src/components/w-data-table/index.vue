<template>
    <table class="table-auto w-full shadow">
        <thead>
            <tr>
                <th
                    v-for="(header, index) in headers"
                    :key="index"
                    :class="head.classes"
                >
                    {{ header.name }}
                </th>
            </tr>
        </thead>
        <tbody>
            <template v-if="items.length === 0">
                <tr :class="tr.classes">
                    <td
                        :class="[td.classes, 'text-center']"
                        :colspan="headers.length"
                    >
                        No items
                    </td>
                </tr>
            </template>
            <template v-else>
                <tr
                    v-for="(item, index) in items"
                    :key="index"
                    :class="tr.classes"
                >
                    <td
                        v-for="value in valuesNames"
                        :key="index + value"
                        :class="[td.classes]"
                    >
                        {{ item[value] }}
                    </td>
                </tr>
            </template>
        </tbody>
    </table>
</template>

<script>

export default {
    name: "WDataTable",
    props: {
        headers: {
            type: Array,
            required: false,
            default: () => []
        },
        items: {
            type: Array,
            required: false,
            default: () => []
        }
    },
    data(){
        return {
            head: {
                classes: ["px-5", "py-3", "text-left"]
            },
            tr: {
                classes: ["border-b", "border-t"]
            },
            td: {
                classes: ["px-5", "py-3"]
            },
        }
    },
    computed: {
        valuesNames(){
            return this.headers.map((header) => header.value);
        }
    },
};
</script>
