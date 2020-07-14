---
title: Data table
---
<component-showcase-view :component-names='["w-data-table"]' />

## Simple usage

<component-code-view>

<w-data-table-docs-example-1 class="-mt-4"  />

::: slot template
```vue
<template>
    <div>
        <w-data-table :headers="headers" :items="items"></w-data-table>
    </div>
</template>
```
:::

::: slot script
```vue
<script>
export default {
    data(){
        return  {
            headers: [
                {
                    name: "Customer fisrt name",
                    value: "first_name"
                },
                {
                    name: "Customer last name",
                    value: "last_name"
                },
            ],
            items: [
                {
                    first_name: "Jonh",
                    last_name: "Walker"
                }
            ],
        }
    },
}
</script>
```
:::

::: slot typescript

```ts
import { defineComponent, reactive } from '@vue/composition-api';
import { Header } from 'vue-wind/@types/components/w-data-table';

type State {
    headers: Header[];
    items: any[];
}

export default defineComponent({
    setup(){
        const state = reactive<State>({
            headers: [
                {
                    name: "Customer fisrt name",
                    value: "first_name"
                },
                {
                    name: "Customer last name",
                    value: "last_name"
                },
            ],
            items: [
                {
                    first_name: "Jonh",
                    last_name: "Walker"
                }
            ],
        });
        return  { headers: state.headers };
    },
})
```
:::
</component-code-view>

## Item slot
<component-code-view>

<w-data-table-docs-example-2 class="-mt-4" />

::: slot template

```vue
<template>
    <div>
        <w-data-table :headers="headers" :items="items">
          <template v-slot:item.first_name="{ item }">
            <span class="text-teal-500">
                {{ item.first_name.toUpperCase() }}
            </span>
          </template>  
        </w-data-table>
    </div>
</template>
```

:::

::: slot script

```vue
<script>
export default {
    data(){
        return  {
            headers: [
                {
                    name: "Customer fisrt name",
                    value: "first_name"
                },
                {
                    name: "Customer last name",
                    value: "last_name"
                },
            ],
            items: [
                {
                    first_name: "Jonh",
                    last_name: "Walker"
                }
            ],
        }
    },
}
</script>
```

:::


</component-code-view>

