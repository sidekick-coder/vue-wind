<template>
    <div class="h-[500px]">
        <w-layout use-percentage>
            
            <w-toolbar :layout-ignore="['left']" class="bg-red-500" >
                <div class="text-white px-5 py-2">Toolbar</div>
            </w-toolbar>
    
            <w-drawer class="bg-blue-500" layout-id="left">
                <div class="text-white px-5 py-2">Drawer</div>
            </w-drawer>
    
            <w-content>
                <div class="w-full h-full flex bg-gray-500 text-white items-center justify-center">
                    Content
                </div>
            </w-content>
        </w-layout>
    </div>
</template>