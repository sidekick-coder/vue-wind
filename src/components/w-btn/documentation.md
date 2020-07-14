---
title: Button component
---
<component-showcase-view :component-names='["w-btn"]' />

## Simple usage

<component-code-view>

<w-btn-docs-example-1 />

::: slot template
```vue
<template>
    <div class="text-center">
        <w-btn @click="count++">Increment</w-btn>
        <span class="ml-4">{{count}}</span>
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
                count: 0
            }
        }
    }
</script>
```
::: 
</component-code-view>

## Colors

<component-code-view>

<div class="text-center">
    <w-btn color="teal-500">Teal color</w-btn>
    <w-btn color="blue-500">Blue color</w-btn>
    <w-btn color="red-500">Red color</w-btn>
    <w-btn color="yellow-500">Yellow color</w-btn>
    <w-btn color="purple-500">Purple color</w-btn>
</div>

::: slot template
```vue
<template>
    <div class="text-center">
        <w-btn color="teal-500">Teal color</w-btn>
        <w-btn color="blue-500">Blue color</w-btn>
        <w-btn color="red-500">Red color</w-btn>
        <w-btn color="yellow-500">Yellow color</w-btn>
        <w-btn color="purple-500">Purple color</w-btn>
    </div>
</template>
```
::: 
</component-code-view>

## Text

<component-code-view>

<div class="text-center">
    <w-btn text color="teal-500">Teal color</w-btn>
    <w-btn text color="blue-500">Blue color</w-btn>
    <w-btn text color="red-500">Red color</w-btn>
    <w-btn text color="yellow-500">Yellow color</w-btn>
    <w-btn text color="purple-500">Purple color</w-btn>
</div>

::: slot template
```vue
<template>
    <div class="text-center">
        <w-btn text color="teal-500">Teal color</w-btn>
        <w-btn text color="blue-500">Blue color</w-btn>
        <w-btn text color="red-500">Red color</w-btn>
        <w-btn text color="yellow-500">Yellow color</w-btn>
        <w-btn text color="purple-500">Purple color</w-btn>
    </div>
</template>
```
::: 
</component-code-view>

## Block

<component-code-view>

<div class="text-center">
    <w-btn class="mb-2" block color="teal-500">Teal color</w-btn>
    <w-btn class="mb-2" block color="blue-500">Blue color</w-btn>
    <w-btn class="mb-2" block color="red-500">Red color</w-btn>
    <w-btn class="mb-2" block color="yellow-500">Yellow color</w-btn>
    <w-btn class="mb-2" block color="purple-500">Purple color</w-btn>
</div>

::: slot template
```vue
<template>
    <div class="text-center">
        <w-btn class="mb-2" block color="teal-500">Teal color</w-btn>
        <w-btn class="mb-2" block color="blue-500">Blue color</w-btn>
        <w-btn class="mb-2" block color="red-500">Red color</w-btn>
        <w-btn class="mb-2" block color="yellow-500">Yellow color</w-btn>
        <w-btn class="mb-2" block color="purple-500">Purple color</w-btn>
    </div>
</template>
```
::: 
</component-code-view>

## Loading

<component-code-view>

<w-btn-docs-example-2 />

::: slot template
```vue
<template>
    <div class="text-center">
        <w-btn :loading="loading" @click="loading = !loading">Set loading</w-btn>
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
            loading: false
        };
    }
};
</script>
``` 
::: 
</component-code-view>