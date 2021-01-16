<template>
    <div>
        <w-select
            label='Select a even number'
            :items='items'
            v-model="model"
            :rules='rules'
        />
    </div>
</template>

<script>
export default {
    data () {
        return {
            model: 2,
            items: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
            rules: [
                value => {
                    return value % 2 === 0 || 'Must select a even number';
                }
            ]
        };
    }
};
</script>

<style>

</style>
