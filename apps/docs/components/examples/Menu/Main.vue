<template>
    <div class="flex justify-center">
        <vw-menu>
            <template #activator="{ attrs }">
                <vw-btn v-bind="attrs">
                    Hover me
                </vw-btn>
            </template>

            <div class="border shadow p-6 bg-white">
                <ul>
                    <li v-for="i in 5">
                        Item {{ i }}
                    </li>
                </ul>
            </div>
        </vw-menu>
    </div>
</template>
