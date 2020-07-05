---
title: Dialog
---

## Simple usage

<component-code-view>

<w-dialog-example />


::: slot template
```vue
<template>
    <div class='text-center'>
        <w-btn @click="dialog = true">show dialog</w-btn>
        <w-dialog v-model="dialog" max-width="lg">
            <w-card>
                <w-card-content class='text-center'>
                    Hello friend
                </w-card-content>
            </w-card>
        </w-dialog>
    </div>
</template>
```
:::

::: slot script
```vue
<script>
    export default {
        data(){
            return {
                dialog: false
            }
        }
    }
</script>
```
:::

</component-code-view>