<script setup lang="ts">

const formRef = ref()

const name = ref("");
const email = ref("");

function submit(){
    alert("submit: all files valid");
}

function required(v: string){
    return !!v || "Field required";
}

function isEmail(v: string){
    if(!v) return true;
    
    return v.includes("@") || "Invalid email";
}

function reset(){
    name.value = "";
    email.value = "";

    formRef.value?.reset();
}

</script>
<template>
    <w-form @submit="submit" ref="formRef">

        <div class="mb-4">
            <w-input v-model="name" label="Required" :rules="[required]" />
        </div>
        
        <div class="mb-4">
            <w-input v-model="email" label="Email" :rules="[required, isEmail]" />
        </div>
        
        <div class="flex">
            <w-btn class="mr-4" color="gray" @click="reset" type="button" >reset</w-btn>
            
            <w-btn>submit</w-btn>
        </div>

    </w-form>
</template>