<script setup lang="ts">
import { codeToHtml } from 'shiki'

// general
const files = import.meta.glob<any>('../../../core/src/components/**/*.vue', {
    eager: true,
    as: 'raw'
})

const components = Object.entries(files).map(([key, value]) => {
    return {
        name: useBasename(key).replace('.vue', ''),
        code: value
    }
})

// code
const name = defineProp<string>('name', {
    type: String,
    required: true
})

const code = ref('')

async function setCode(){
    
    const search = components.find(c => c.name === name.value)

    if (!search) {
        code.value = ''
        return
    }


    code.value = await codeToHtml(search.code, {
        lang: 'vue',
        theme: 'dracula'
    })
}


watch(name, setCode, { immediate: true })

// toggle
const show = ref(false)

// copy code
function copyCode() {
    const search = components.find(c => c.name === name.value)

    navigator.clipboard.writeText(search?.code)

    alert('Copied!')
}
</script>

<template>
    <div class="rounded overflow-hidden border">
        <div class="flex px-4 py-2 items-center cursor-pointer hover:bg-zinc-100" @click="show = !show">
            <div class="flex-1">
                <span class="font-bold">{{ name }}</span>
            </div>

            <div class="text-lg flex items-center gap-2">
                <button
                    @click.stop="copyCode"
                    class="hover:bg-zinc-200 p-2 rounded"
                >
                    <DIcon name="mdi:content-copy"/>
                </button>

                <button class="hover:bg-zinc-200 p-2 rounded">
                    <DIcon
                        name="mdi:chevron-down"
                        class="transform transition-transform"
                        :class="{'rotate-180': show}"
                    />
                </button>

            </div>
        </div>

        <div v-if="code && show" v-html="code" />
    </div>
</template>