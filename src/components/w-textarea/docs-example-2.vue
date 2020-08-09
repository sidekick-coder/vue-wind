<template>
    <div>
        <w-textarea label='Message' v-model="message" :rules='rules'></w-textarea>
    </div>
</template>

<script>
export default {
    data () {
        return {
            message: '',
            rules: [
                (value) => {
                    return value.includes('Hello') || 'Hello must be in message';
                }
            ]
        };
    }
};
</script>
