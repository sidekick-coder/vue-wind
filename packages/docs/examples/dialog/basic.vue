<script setup lang="ts">
const dialog = ref(false)

</script>
<template>
    <div class="flex justify-center">
        <w-btn @click="dialog = true" >Show</w-btn>

        <w-dialog v-model="dialog">
            <w-card>
                Hello word
            </w-card>
        </w-dialog>
    </div>
</template>