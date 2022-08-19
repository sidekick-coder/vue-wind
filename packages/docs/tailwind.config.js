/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./components/**/**/*.{js,vue,ts}",
    "./examples/**/*.{js,vue,ts}",
    "./layouts/**/*.vue",
    "./pages/**/*.vue",
    "./plugins/**/*.{js,ts}",
    "./nuxt.config.{js,ts}",

    "../vue-wind/components/**/*.{vue,ts}",
    "../vue-wind/composables/**/*.{vue,ts}",
  ],
  theme: {
    extend: {},
  },
  plugins: [],
}
