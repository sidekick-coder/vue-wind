# Icons

w-icon component have 2 modes, one is using pure svg and the other is using an external vue component of other framework like [vue-fontawesome](https://github.com/FortAwesome/vue-fontawesome).

## Using vanilla mode
This is the default mode if the iconComponent is not defined in plugin install options. In this mode you can use the component with pure svg icons.

You can also force this mode by passing the prop vanilla `<w-icon vanilla />`

<component-code-view>

<div class="flex justify-center">
    <w-icon vanilla>
        <svg class='h-5 w-5 fill-current text-teal-500'>
            <circle cx="10" cy="10" r="10" />
        </svg>
    </w-icon>
</div>

::: slot template

```vue
<template>
    <div class="flex justify-center">
        <w-icon>
            <svg class='h-5 w-5 fill-current text-teal-500'>
                <circle cx="10" cy="10" r="10" />
            </svg>
        </w-icon>
    </div>
</template>
```
:::

</component-code-view>

## Using vue fontawesome       

### 1 - install package

```sh
npm i --save @fortawesome/fontawesome-svg-core
npm i --save @fortawesome/free-solid-svg-icons
npm i --save @fortawesome/vue-fontawesome
```

### 2 - Register FontAwesomeIcon component and define hist name in vuewind install options
```js
import { library } from '@fortawesome/fontawesome-svg-core'
import { fas } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'

library.add(fas);

Vue.component('FontAwesomeIcon', FontAwesomeIcon);

Vue.use(VueWind, { iconComponent: 'FontAwesomeIcon' });

new Vue({
  render: h => h(App)
}).$mount('#app')

```

### 3 - The w-icon will now render a FontAwesomeIcon instance binding the props passing to him to the component

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

