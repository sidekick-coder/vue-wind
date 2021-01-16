<template>
    <div>
        <w-select
            label='Select a color'
            :items='items'
            v-model="model"
        />

        <p :class="['mt-4', `text-${model}-500`]">selected {{model}}</p>
    </div>
</template>

<script>
export default {
    data () {
        return {
            model: 'red',
            items: ['red', 'green', 'purple', 'blue']
        };
    }
};
</script>

<style>

</style>
