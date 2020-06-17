<template>
    <table class="table-auto w-full shadow">
        <thead>
            <tr>
                <th
                    v-for="(header, index) in headers"
                    :key="index"
                    :class="[headerItemsDefaultClasses, header.classes]"
                >
                    {{ header.name }}
                </th>
            </tr>
        </thead>
        <tbody>
            <template v-if="items.length === 0">
                <tr :class="itemsTrDefaultClasses">
                    <td
                        :class="[itemsThDefaultClasses, 'text-center']"
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
                    :class="itemsTrDefaultClasses"
                >
                <template v-for="value in valuesNames">
                    <td
                        :key="index + value"
                        :class="[itemsThDefaultClasses]"
                    >
                        <slot :name="`item.${value}`" :item="item">
                            {{ item[value] }}
                        </slot>
                    </td>
                </template>
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
        },
        headerItemsDefaultClasses: {
            type: [String, Array, Object],
            default: () => [
                "px-5", "py-3", "text-left"
            ]
        },
        itemsTrDefaultClasses: {
            type: [String, Array, Object],
            default: () => [
                "border-b", "border-t"
            ]
        },
        itemsThDefaultClasses: {
            type: [String, Array, Object],
            default: () => [
                "px-5", "py-3"
            ]
        },
    },
    data(){
        return {}
    },
    computed: {
        valuesNames(){
            return this.headers.map((header) => header.value);
        }
    },
};
</script>
