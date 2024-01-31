<script setup lang="ts">

interface Header {
    label: string
    header: true
}

interface Link {
    label: string
    to: string
}

const links = ref<(Link | Header)[]>([])

async function addSection(label: string, documentsPath: string) {
    const docs = await queryContent(documentsPath).find()

    links.value.push({    
        label,
        header: true,
    })

    docs.forEach((doc) => {
        links.value.push({
            label: doc.title || doc.slug,
            to: doc._path!,
        })
    })
}

await addSection("Guides", "guides")
await addSection("Components", "components")
await addSection("Directives", "directives")

</script>
<template>
    <div class="h-screen w-full flex flex-col">
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