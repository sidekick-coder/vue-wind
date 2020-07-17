---
title: Card component
---
<component-showcase-view
:component-names='["w-card", "w-card-title", "w-card-content"]'
/>

## Simple usage

<component-code-view>

<w-card max-width="300px" class="mx-auto">

<img :src="$withBase('/images/game-sample.jpg')" alt="game-sample">

<w-card-title class='font-bold'>Game Life</w-card-title>

<w-card-content>The good points of play video games in your life</w-card-content>

</w-card>

::: slot template

```vue
<template>
    <w-card max-width="300px" class="mx-auto">
        <img src="/images/game-sample.jpg" />
        <w-card-title class='font-bold'>Game Life</w-card-title>
        <w-card-content>
            The good points of play video games in your life
        </w-card-content>
    </w-card>
</template>
```
:::
</component-code-view>

## Color

<component-code-view>
<div class="flex">

<w-card max-width="300px" class="mx-auto" color="teal-500">
<w-card-content class="text-white">Card color teal</w-card-content>
</w-card>

<w-card max-width="300px" class="mx-auto" color="blue-500">
<w-card-content class="text-white">Card color blue</w-card-content>
</w-card>
<w-card max-width="300px" class="mx-auto" color="purple-500">
<w-card-content class="text-white">Card color purple</w-card-content>
</w-card>

</div>

::: slot template

```vue
<template>
    <div class="flex">
        <w-card max-width="300px" class="mx-auto" color="teal-500">
            <w-card-content class="text-white">Card color teal</w-card-content>
        </w-card>
        <w-card max-width="300px" class="mx-auto" color="blue-500">
            <w-card-content class="text-white">Card color blue</w-card-content>
        </w-card>
        <w-card max-width="300px" class="mx-auto" color="purple-500">
            <w-card-content class="text-white">Card color purple</w-card-content>
        </w-card>
    </div>
</template>
```
:::
</component-code-view>

## Shadow

<component-code-view>
<div class="flex">

<w-card max-width="150px" class="mx-auto" :shadow="false">
<w-card-content>No shadow</w-card-content>
</w-card>

<w-card max-width="150px" class="mx-auto" shadow="md">
<w-card-content>md shadow</w-card-content>
</w-card>

<w-card max-width="150px" class="mx-auto" shadow="lg">
<w-card-content>lg shadow</w-card-content>
</w-card>

<w-card max-width="150px" class="mx-auto" shadow="xl">
<w-card-content>xl shadow</w-card-content>
</w-card>

</div>

::: slot template

```vue
<template>
    <div class="flex">
        <w-card max-width="150px" class="mx-auto" :shadow="false">
            <w-card-content>No shadow</w-card-content>
        </w-card>
        <w-card max-width="150px" class="mx-auto" shadow="md">
            <w-card-content>md shadow</w-card-content>
        </w-card>
        <w-card max-width="150px" class="mx-auto" shadow="lg">
            <w-card-content>lg shadow</w-card-content>
        </w-card>
        <w-card max-width="150px" class="mx-auto" shadow="xl">
            <w-card-content>xl shadow</w-card-content>
        </w-card>
    </div>
</template>
```
:::
</component-code-view>

## Border

<component-code-view>
<div class="flex">

<w-card max-width="150px" class="mx-auto" :shadow="false" border>
<w-card-content>Border</w-card-content>
</w-card>

<w-card max-width="150px" class="mx-auto" :shadow="false" border border-color="teal-500">
<w-card-content>Border teal</w-card-content>
</w-card>

<w-card max-width="150px" class="mx-auto" :shadow="false" border border-color="blue-500">
<w-card-content>Border blue</w-card-content>
</w-card>

<w-card max-width="150px" class="mx-auto" :shadow="false" border border-color="purple-500">
<w-card-content>Border purple</w-card-content>
</w-card>

</div>

::: slot template

```vue
<template>
    <div class="flex">
        <w-card max-width="150px" class="mx-auto" :shadow="false" border>
            <w-card-content>Border</w-card-content>
        </w-card>
        <w-card max-width="150px" class="mx-auto" :shadow="false" border border-color="teal-500">
            <w-card-content>Border teal</w-card-content>
        </w-card>
        <w-card max-width="150px" class="mx-auto" :shadow="false" border border-color="blue-500">
            <w-card-content>Border blue</w-card-content>
        </w-card>
        <w-card max-width="150px" class="mx-auto" :shadow="false" border border-color="purple-500">
            <w-card-content>Border purple</w-card-content>
        </w-card>
    </div>
</template>
```
:::
</component-code-view>