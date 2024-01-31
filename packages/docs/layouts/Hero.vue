
<template>
    <div class="h-screen w-screen flex flex-col">
        <DAppToolbar />
        
        <div class="grow flex items-center justify-center" >
            <div>
                <h1 class="text-3xl font-bold text-center  mb-5">
                    Vue wind
                </h1>
        
                <div class="text-center">
                    

                    <slot />
                </div>        
            </div>
        </div>
    </div>
</template>