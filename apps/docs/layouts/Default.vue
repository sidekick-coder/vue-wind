<script setup lang="ts">

interface Header {
    label: string
    header: true
    icon?: string
}

interface Link {
    label: string
    to: string
}

const links = ref<(Link | Header)[]>([])

interface SectionOptions {
    label: string
    documentsPath: string
    icon?: string
}

async function addSection({ label, documentsPath, icon }: SectionOptions) {
    const docs = await queryContent(documentsPath).find()

    links.value.push({    
        label,
        header: true,
        icon
    })

    docs.forEach((doc) => {
        links.value.push({
            label: doc.title || doc.slug,
            to: doc._path!,
        })
    })
}

await addSection({
    label: 'Guides',
    documentsPath: 'guides',
    icon: 'mdi:rocket',
})

await addSection({
    label: 'Components',
    documentsPath: 'components',
    icon: 'mdi:cube-outline',
})

await addSection({
    label: 'Directives',
    documentsPath: 'directives',
    icon: 'mdi:toolbox-outline',
})

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
                        class="px-4 px-4 py-2 flex items-center text-sm"
                        :class="[
                            link.header ? 'font-bold text-teal-900' : '',
                            link.to ? 'hover:bg-zinc-200' : ''
                        ]"
                    >
                        <d-icon
                            :name="link.icon || 'mdi:circle-small'"
                            class="mr-2"
                        />

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