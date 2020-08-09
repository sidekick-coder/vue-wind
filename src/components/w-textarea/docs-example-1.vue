<template>
    <div>
        <w-textarea v-model="message" label='Message' placeholder='Type a cool message...' />
    </div>
</template>

<script>
export default {
    data () {
        return {
            message: ''
        };
    }
};
</script>
