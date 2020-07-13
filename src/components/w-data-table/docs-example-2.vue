<template>
    <w-data-table :headers="headers" :items="items">
        <template v-slot:item.first_name="{ item }">
            <span class="text-teal-500">
                {{ item.first_name.toUpperCase() }}
            </span>
        </template>
    </w-data-table>
</template>

<script>
export default {
    data () {
        return {
            headers: [
                {
                    name: 'Customer fisrt name',
                    value: 'first_name'
                },
                {
                    name: 'Customer last name',
                    value: 'last_name'
                }
            ],
            items: [
                {
                    first_name: 'Jonh',
                    last_name: 'Walker'
                }
            ]
        };
    }
};
</script>
