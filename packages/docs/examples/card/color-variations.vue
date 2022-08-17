<template>
    <div class="flex gap-4">
        <w-card
            v-for="color in ['white', 'gray', 'teal', 'blue']"
            :color="color"
            :key="color"
            class="max-w-[300px] mx-auto text-xs"
        >
            <template #header>{{ color }}</template>

            <p>Lorem ipsum dolor sit amet consectetur adipisicing elit.</p>
        </w-card>
        
        <w-card
            class="max-w-[300px] mx-auto text-xs"
            custom:color="bg-[#84cc16] text-white"
        >
            <template #header>custom</template>

            <p>Lorem ipsum dolor sit amet consectetur adipisicing elit.</p>
        </w-card>
    </div>
</template>