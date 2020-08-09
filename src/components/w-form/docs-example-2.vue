<template>
    <w-form ref="form" @submit.prevent="submit">
        <w-card max-width='md' class="mx-auto">
            <w-card-content>
                <w-input
                    v-model="requiredField"
                    :rules="[rules.required]"
                    label='Required field'
                    class="mb-2"
                />
                <w-text-field
                    v-model="moreThan3"
                    :rules="[rules.moreThan3]"
                    label='More than 3'
                    class="mb-2"
                />
                <w-textarea
                    v-model="mustSayHi"
                    label='Must start with "Hi"'
                    :rules="[rules.mustSayHi]"
                />
                <w-btn class="mt-5" block type='submit'>submit</w-btn>
            </w-card-content>
        </w-card>
    </w-form>
</template>

<script>
export default {
    data () {
        return {
            requiredField: '',
            moreThan3: '',
            mustSayHi: '',
            rules: {
                required: value => !!value || 'Required',
                moreThan3: value => value.length >= 3 || 'Must be more than 3 chars',
                mustSayHi: value => value.includes('Hi') || 'Must say "Hi"'
            }
        };
    },
    methods: {
        submit () {
            if (!this.$refs.form.validate()) {
                return;
            }
            alert('form submitted');
        }
    }
};
</script>
