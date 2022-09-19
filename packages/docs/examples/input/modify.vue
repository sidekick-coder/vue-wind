
<script setup lang="ts">
const name = ref('Dark mode input')

function modifyToDarkTeal(builder: any){
    builder
        .remove('placeholder-shown:bg-gray-200', 'focus:bg-white', 'text-gray-400')
        .add('placeholder-shown:bg-gray-700', 'bg-gray-600', 'text-teal-500')
    
    builder
        .child('label')
        .remove('text-gray-500')
        .add('text-teal-400')
}

function modifyToDarkBlue(builder: any){
    builder
        .remove('placeholder-shown:bg-gray-200', 'focus:bg-white', 'text-gray-400')
        .add('placeholder-shown:bg-gray-700', 'bg-gray-600', 'text-blue-500')
        .add('text-right')
    
    builder
        .child('label')
        .remove('text-gray-500')
        .add('text-blue-400 text-right')
}
</script>

<template>
    <div class="flex flex-wrap">
        <div class="mb-4 w-full">
            <w-input label="Label on left" :value="name" :modify="modifyToDarkTeal" />
        </div>
        <div class="mb-4 w-full">
            <w-input label="Label on right" :value="name" :modify="modifyToDarkBlue" />
        </div>
    </div>
</template>