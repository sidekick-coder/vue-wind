---
title: icon component
---
<component-showcase-view class="mb-5" :component-names='["w-icon"]' />

To use icons you need install an external library or use pure svg elements, got to [icons page](/guide/icons) to see more about it.

## Simple usage

<component-code-view>

<div class="text-center text-lg">
    <w-icon icon="home" />
    <w-icon icon="user" />
    <w-icon icon="coffee" />
    <w-icon icon="book" />
    <w-icon icon="tree" />
</div>

::: slot template
```vue
<template>
    <div class="text-center text-lg">
        <w-icon icon="home" />
        <w-icon icon="user" />
        <w-icon icon="coffee" />
        <w-icon icon="book" />
        <w-icon icon="tree" />
    </div>
</template>
```
:::

</component-code-view>

## Vanilla usage

<component-code-view>

<div class="flex justify-center">
    <w-icon vanilla class="mr-2">
        <svg class='h-5 w-5 fill-current text-teal-500'>
            <circle cx="10" cy="10" r="10" />
        </svg>
    </w-icon>
    <w-icon vanilla class="mr-2">
        <svg class='h-5 w-5 fill-current text-teal-500'>
            <rect width="20" height="20" />
        </svg>
    </w-icon>
    <w-icon vanilla>
        <svg class='h-5 w-5 fill-current text-teal-500'>
            <polygon points="0 20, 10 0, 20 20" />
        </svg>
    </w-icon>
</div>

::: slot template

```vue
<template>
    <div class="flex justify-center">
    <w-icon vanilla class="mr-2">
        <svg class='h-5 w-5 fill-current text-teal-500'>
            <circle cx="10" cy="10" r="10" />
        </svg>
    </w-icon>
    <w-icon vanilla class="mr-2">
        <svg class='h-5 w-5 fill-current text-teal-500'>
            <rect width="20" height="20" />
        </svg>
    </w-icon>
    <w-icon vanilla>
        <svg class='h-5 w-5 fill-current text-teal-500'>
            <polygon points="0 20, 10 0, 20 20" />
        </svg>
    </w-icon>
</div>
</template>
```
:::

</component-code-view>