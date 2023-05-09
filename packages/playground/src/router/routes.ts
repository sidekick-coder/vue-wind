import type { RouteRecordRaw } from "vue-router"

const files = import.meta.glob('../views/*.vue')

const links: RouteRecordRaw[] = Object.keys(files).map((key) => {
  const name = key.match(/\.\/views\/(.*)\.vue$/)?.[1] ?? ''

  const path = name === 'Home' ? '/' : `/${name.toLowerCase()}`
  
  return {
    path,
    name,
    component: files[key],
  }
})

links.sort((a, b) => {
    if (a.path === '/') return -1
    if (b.path === '/') return 1
    return a.path.localeCompare(b.path)
})

export default links