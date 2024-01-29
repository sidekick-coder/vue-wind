<script setup lang="ts">
const links = [
    {
        label: "Components",
        header: true
    },
    {
        label: "Button",
        to: "/components/button",
    },
]

</script>
<template>
    <div class="h-screen w-screen flex flex-col">
        <DAppToolbar />

        <div class="flex grow">

            <div class="w-72 border-r h-full">
                <div class="flex flex-col">
                    <nuxt-link
                        v-for="link in links"
                        :key="link.label"
                        :to="link.to"
                        class="px-4 px-4 py-2"
                        :class="[
                            link.header ? 'font-bold' : '',
                            link.to ? 'hover:bg-zinc-200' : ''
                        ]"
                    >
                        {{ link.label }}
                    </nuxt-link>
                </div>
            </div>

            <div class="grow p-4">
                <slot />
            </div>

        </div>
    </div>
</template>