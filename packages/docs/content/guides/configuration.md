
## Configuration

To configure tailwind you will have to add these entries to content

```js
/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    ...

    "node_modules/vue-wind/composables/**/*.ts",
    "node_modules/vue-wind/components/**/*.{ts,vue}",
  ],
  theme: {
    extend: {},
  },
  plugins: [],
}
```

## More minimalist way

Also you can add just the components you will use

```js
/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    ...

    "node_modules/vue-wind/composables/button.ts",
    "node_modules/vue-wind/components/w-btn/w-btn.vue",
  ],
  theme: {
    extend: {},
  },
  plugins: [],
}
```