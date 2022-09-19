<template>
    <w-toolbar :layout-ignore="['drawer']" :height="45" class="border-b z-10 ">
        <nuxt-link to="/" class="px-4 flex items-center">
            <img
                src="/logo-full.svg"
                alt="vue-wind"
                width="35"                        
                height="21"
            >

            <span class="ml-2 text-teal-500 font-bold">Vue wind</span>
        </nuxt-link>
    </w-toolbar>
</template>