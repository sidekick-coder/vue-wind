import { provide, inject } from 'vue'
import type { InjectionKey } from 'vue'

interface WBtnVariation {
    // default color
    color: string
    // default size
    size: string
    // default color variants
    colors: Record<string, string>
    // default size variants
    sizes: Record<string, string>
}

export const defaultColors: WBtnVariation['colors'] = {
    'basic:gray': 'bg-gray-500 text-gray-100',
    'basic:blue': 'bg-blue-500 text-white',
    'basic:green': 'bg-green-500 text-white',
    'basic:red': 'bg-red-500 text-white',
    'basic:sky': 'bg-sky-500 text-white',
    'basic:teal': 'bg-teal-500 text-white',
    'basic:yellow': 'bg-yellow-500 text-white',

    'outlined:gray': 'border border-gray-500 text-gray-500 bg-white',
    'outlined:blue': 'border border-blue-500 text-blue-500 bg-white',
    'outlined:green': 'border border-green-500 text-green-500 bg-white',
    'outlined:red': 'border border-red-500 text-red-500 bg-white',
    'outlined:sky': 'border border-sky-500 text-sky-500 bg-white',
    'outlined:teal': 'border border-teal-500 text-teal-500 bg-white',
    'outlined:yellow': 'border border-yellow-500 text-yellow-500 bg-white',
}

export const defaultSizes: WBtnVariation['sizes'] = {
    sm: 'px-3 py-2 text-xs',
    md: 'px-3 py-2 text-base',
    lg: 'px-4 py-2 text-lg',
    xl: 'px-4 py-3 text-xl',
}

export const key = Symbol('v-wind:btn:variation') as InjectionKey<WBtnVariation>

export function provideVariation(variation: WBtnVariation){
    provide(key, variation)
}

export function useVariation(){
    return inject(key, {
        color: 'gray',
        size: 'md',
        colors: defaultColors,
        sizes: defaultSizes,
    })
}