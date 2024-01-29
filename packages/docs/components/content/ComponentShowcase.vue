<script setup lang="ts">
import { codeToHtml } from 'shiki'
const tab = ref('preview')

const props = defineProps({
    filename: {
        type: String,
        required: true
    }
})

const all = import.meta.glob('../examples/**/*.vue', {
    eager: true
})

const allRaw = import.meta.glob('../examples/**/*.vue', {
    eager: true,
    as: 'raw'
})

const showcaseComponent = shallowRef<any>({
    instance: null,
    raw: null
})

const htmlCode = ref('')

async function load() {
    const instance = all[`../examples/${props.filename}.vue`] as any
    const raw = allRaw[`../examples/${props.filename}.vue`] as any

    showcaseComponent.value = {
        instance: instance?.default,
        raw: raw
    }
}

async function loadCode(){
    if (!showcaseComponent.value.raw) {
        return
    }

    const html = await codeToHtml(showcaseComponent.value.raw, {
        lang: 'vue',
        theme: 'dracula'
    })

    htmlCode.value = html
}

load()

watch(() => showcaseComponent.value.raw, loadCode, {
    immediate: true

})
</script>
<template>
    <div class="component-showcase border rounded overflow-hidden my-4">
        <div class="flex border-b">
            <button class="px-4 py-2 hover:bg-zinc-100" @click="tab = 'preview'" >Preview</button>
            <button class="px-4 py-2 hover:bg-zinc-100" @click="tab = 'code'" >Code</button>
        </div>

        <div>
            <div v-if="tab === 'preview'">
                <component v-if="showcaseComponent.instance" :is="showcaseComponent.instance" />
            </div>
            
            <div v-else v-html="htmlCode"  />
        </div>
    </div>
</template>

<style>
.component-showcase .shiki {
    @apply p-4;
}
</style>