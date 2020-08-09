<template>
  <w-form ref='form' @submit.prevent="submit">
    <w-card max-width='md' class="mx-auto">
        <w-card-title>
            <h4 v-if="formValid === null" class="text-gray-500">Form</h4>
            <h4 v-else-if="formValid" class="text-green-500">Form valid</h4>
            <h4 v-else class="text-red-500">Form invalid</h4>
        </w-card-title>
        <w-card-content>
            <w-text-field label='Name' v-model="name" :rules='[rules.required]' />
            <w-text-field label='Email' type='email' v-model="email" :rules='[rules.required]' />
            <w-btn type="submit" class="mt-5" block>
                submit
            </w-btn>
        </w-card-content>
    </w-card>
  </w-form>
</template>

<script>
export default {
    data () {
        return {
            name: '',
            email: '',
            formValid: null,
            rules: {
                required: value => !!value || 'required'
            }
        };
    },
    methods: {
        submit () {
            if (this.$refs.form.validate()) {
                this.formValid = true;
            } else {
                this.formValid = false;
            }
        }
    }
};
</script>
