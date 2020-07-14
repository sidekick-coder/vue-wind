<template>
    <div class="text-center">
        <w-btn @click="count++">Increment</w-btn>
        <span class="ml-4">{{count}}</span>
    </div>
</template>

<script>
export default {
    data () {
        return {
            count: 0
        };
    }
};
</script>
