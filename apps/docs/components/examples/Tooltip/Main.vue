<template>
    <div class="flex justify-center">
        <vw-tooltip>
            <template #activator="{ attrs }">
                <vw-btn v-bind="attrs">
                    Hover me
                </vw-btn>
            </template>

            <div>
                Hello world
            </div>
        </vw-tooltip>
    </div>
</template>
