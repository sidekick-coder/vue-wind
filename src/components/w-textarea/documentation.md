# Textarea

<w-textarea-docs-showcase />


## Simple usage
<component-code-view>

<w-textarea-docs-example-1 />

::: slot template

```vue
<template>
    <div>
        <w-textarea v-model="message" label='Message' placeholder='Type a cool message...' />
    </div>
</template>
```
:::

::: slot script

```js
export default {
    data () {
        return {
            message: ''
        };
    }
};
```
:::

</component-code-view>

## Validation
<component-code-view>

<w-textarea-docs-example-2 />

::: slot template

```vue
<template>
    <div>
        <w-textarea v-model="message" :rules='rules'></w-textarea>
    </div>
</template>
```
:::

::: slot script

```js
export default {
    data () {
        return {
            message: '',
            rules: [
                (value) => {
                    if (!value) return true;
                    return value.includes('Hello') || 'Hello must be first';
                }
            ]
        };
    }
};
```
:::


::: slot typescript

```ts
import { defineComponent, reactive } from '@vue/composition-api';
import { Rule } from 'vue-wind/@types/components/w-input';

type State {
    message: string,
    rules: Rule[]
}

export default defineComponent({
    setup(){
        const state = reactive<State>({
            message: '',
            rules: [
               (value) => {
                    if (!value) return true;
                    return value.includes('Hello') || 'Hello must be first';
                }
            ]
        });

        return  state;
    },
})
```
:::
</component-code-view>