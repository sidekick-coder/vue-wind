<template>
    <div class="text-center">
        <w-btn :loading="loading" @click="loading = !loading">Set loading</w-btn>
    </div>
</template>

<script>
export default {
    data () {
        return {
            loading: false
        };
    }
};
</script>
