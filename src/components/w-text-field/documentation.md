# w-text-field

<w-text-field-docs-showcase />

## Simple usage
<component-code-view>

<w-text-field-docs-example-1 />

::: slot template

```vue
<template>
  <div>
      <w-text-field v-model="name" label='Name' placeholder='Type your name' />
      <div class="text-center my-4">
        My name is: <strong>{{name}}</strong>
      </div>
  </div>
</template>
```

:::

::: slot script

```vue
<script>
export default {
    data () {
        return {
            name: ''
        };
    }
};
</script>
```
:::
</component-code-view>

## Validation
<component-code-view>

<w-text-field-docs-example-2 />

::: slot template

```vue
<template>
  <div>
      <w-text-field
        v-model='model'
        label='Min 5 characters max 10 characters'
        :rules='rules'
        placeholder="Type a text" />
  </div>
</template>
```

:::

::: slot script

```vue
<script>
export default {
    data: () => ({
        model: '',
        rules: [
            (value) => {
                return value.length >= 5 || 'Min 5 characters';
            },
            (value) => {
                return value.length <= 10 || 'Max 10 characters';
            }
        ]
    })
};
</script>
```
:::

::: slot typescript

```ts
import { defineComponent, reactive } from '@vue/composition-api';
import { Rule } from 'vue-wind/@types/components/w-input';

type State {
        model: string,
        rules: Rule[]
}

export default defineComponent({
    setup(){
        const state = reactive<State>({
            model: '',
            rules: [
                (value) => {
                    return value.length >= 5 || 'Min 5 characters';
                },
                (value) => {
                    return value.length <= 10 || 'Max 10 characters';
                }
            ]
        });

        return  state;
    },
})
```
:::

</component-code-view>

## Colors
<component-code-view>
<div class='grid md:grid-cols-5 gap-2'>
    <w-text-field label='Teal' color='teal-400' focus:color='teal-500' />
    <w-text-field label='Blue' color='blue-400' focus:color='blue-500' />
    <w-text-field label='Red' color='red-400' focus:color='red-500' />
    <w-text-field label='Yellow' color='yellow-400' focus:color='yellow-500' />
    <w-text-field label='purple' color='purple-400' focus:color='purple-500' />
</div>

::: slot template

```vue
<template>
    <div class='grid md:grid-cols-5 gap-2'>
        <w-text-field label='Teal' color='teal-400' focus:color='teal-500' />
        <w-text-field label='Blue' color='blue-400' focus:color='blue-500' />
        <w-text-field label='Red' color='red-400' focus:color='red-500' />
        <w-text-field label='Yellow' color='yellow-400' focus:color='yellow-500' />
        <w-text-field label='purple' color='purple-400' focus:color='purple-500' />
    </div>
</template>
```

:::
</component-code-view>

## Focus Colors
<component-code-view>
<div class='grid md:grid-cols-5 gap-2'>
    <w-text-field label='Focus teal' focus:color='teal-500' />
    <w-text-field label='Focus blue' focus:color='blue-500' />
    <w-text-field label='Focus red' focus:color='red-500' />
    <w-text-field label='Focus yellow' focus:color='yellow-500' />
    <w-text-field label='Focus purple' focus:color='purple-500' />
</div>

::: slot template

```vue
<template>
    <div class='grid md:grid-cols-5 gap-2'>
        <w-text-field label='Focus teal' focus:color='teal-500' />
        <w-text-field label='Focus blue' focus:color='blue-500' />
        <w-text-field label='Focus red' focus:color='red-500' />
        <w-text-field label='Focus yellow' focus:color='yellow-500' />
        <w-text-field label='Focus purple' focus:color='purple-500' />
    </div>
</template>
```

:::
</component-code-view>

## Input types
<component-code-view>

<div class='grid md:grid-cols-4 gap-2'>
    <w-text-field label='text' type='text' value='A text field' />
    <w-text-field label='number' type='number' value='123456789' />
    <w-text-field label='email' type='email' value='hello-word@email.com' />
    <w-text-field label='password' type='password' value='123456789' />
</div>

::: slot template

```vue
<template>
    <div class='grid md:grid-cols-4 gap-2'>
        <w-text-field label='text' type='text' value='A text field' />
        <w-text-field label='number' type='number' value='123456789' />
        <w-text-field label='email' type='email' value='hello-word@email.com' />
        <w-text-field label='password' type='password' value='123456789' />
    </div>
</template>
```

:::
</component-code-view>