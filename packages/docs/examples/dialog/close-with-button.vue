<script setup lang="ts">
const dialog = ref(false)

</script>
<template>
    <div class="flex justify-center">
        <w-btn @click="dialog = true" >Show</w-btn>

        <w-dialog
            v-model="dialog"
            :close-on-overlay-click="false"
        >
            
            <div class="flex flex-wrap justify-center p-5">
                <div class="mb-4 w-full text-center text-2xl font-bold">
                    Confirm your action
                </div>

                <div class="w-full text-sm text-center mb-4">
                    Etiam dictum interdum justo,
                    in sagittis erat tristique at.
                    Morbi in metus ac dolor consequat dictum quis sit amet velit.
                </div>

                <w-btn @click="dialog = false" outlined class="mr-4" >Agree</w-btn>
                <w-btn @click="dialog = false" outlined >Disagree</w-btn>
            </div>            
        </w-dialog>
    </div>
</template>