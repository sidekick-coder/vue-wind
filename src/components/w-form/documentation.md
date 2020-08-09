# Form

<component-showcase-view component-names='w-form' />
## Simple usage

<component-code-view>

<w-form-docs-example-1 />

::: slot template
```vue
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
```
:::

::: slot script
```vue
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

```
:::

::: slot typescript

```ts
import { defineComponent, reactive } from '@vue/composition-api';
import { Rule } from 'vue-wind/@types/components/w-input';

type State {
        name: string,
        email: string,
        rules: {
            [prop: string]: Rule
        }
}

export default defineComponent({
    setup(){
        const state = reactive<State>({
            name: '',
            email: '',
            rules: {
                required: value => !!value || 'required'
            }
        });

        const submit = () => {
            if (this.$refs.form.validate()) {
                this.formValid = true;
            } else {
                this.formValid = false;
            }
        }

        return  {
            name: state.name,
            email: state.email,
            rules: state.rules,
            submit
        };
    },
})
```
:::

</component-code-view>


## Validate function

This function call all w-inputs validate() method to trigger their rules.

It will return true if pass in all rules and false if fail in one of them.

<component-code-view>

<w-form-docs-example-2 />

::: slot template
```vue
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
```
:::

::: slot script
```js
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
```
:::

</component-code-view>