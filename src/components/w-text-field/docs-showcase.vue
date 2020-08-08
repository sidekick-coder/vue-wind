<template>
  <component-showcase-view class="mb-5" :component-names='componentNames' ></component-showcase-view>
</template>

<script>
export default {
    data: () => ({
        componentNames: { name: 'w-text-field', merge: ['w-input'], excludeProps: ['component'] }
    })
};
</script>

<style>

</style>
