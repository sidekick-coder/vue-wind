<template>
    <div class="w-full h-full flex flex-wrap items-center justify-center" >

        <div class="text-center flex flex-wrap justify-center">
            <div class="w-full mb-10 flex justify-center">
                <img src="/logo-full.svg" alt="vue-wind">
            </div>

            <div class="w-full text-center mb-5">
                <h1 class="mb-4 text-4xl font-bold">Vue wind</h1>
            </div>

            <div class="w-full flex justify-center">
                <w-btn
                    nuxt
                    class="mr-4 w-[150px]"
                    to="/guides/installation"
                >
                    Guides
                </w-btn>

                <w-btn
                    nuxt
                    class="mr-4 w-[150px]"
                    to="/components"
                >
                    Components
                </w-btn>
                
                <w-btn
                    nuxt
                    target="_blank"
                    to="https://github.com/sidekick-coder/vue-wind"
                    class="w-[150px]"
                >
                    <fa-icon icon="fa-brands fa-github" />
                    <div class="ml-2">
                        Github
                    </div>
                </w-btn>
            </div>
            
        </div>

    </div>
</template>