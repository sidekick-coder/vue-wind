---
title: select component
---
## Simple usage
<component-code-view>
<w-select-docs-example-1 />

::: slot template

```html
<div>
    <w-select
        label='Select a color'
        :items='items'
        v-model="model"
    />

    <p :class="['mt-4', `text-${model}-500`]">selected {{model}}</p>
</div>
```
:::

::: slot script

```js
export default {
    data () {
        return {
            model: 'red',
            items: ['red', 'green', 'purple', 'blue']
        };
    }
};
```

:::

</component-code-view>

## Usage with rules
<component-code-view>

<w-select-docs-example-2 />

</component-code-view>