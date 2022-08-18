import { provide, inject, InjectionKey } from 'vue'

export interface WInputVariation {
    // default color
    color: string
    // default color variants
    colors: Record<string, string>
}

export const defaultColors: WInputVariation['colors'] = {
    'gray': 'border-gray-300 focus:border-gray-500',
    'blue': 'border-gray-300 focus:border-blue-500',
    'green': 'border-gray-300 focus:border-green-500',
    'red': 'border-gray-300 focus:border-red-500',
    'sky': 'border-gray-300 focus:border-sky-500',
    'teal': 'border-gray-300 focus:border-teal-500',
    'yellow': 'border-gray-300 focus:border-yellow-500 ',
}

export const key = Symbol('v-wind:input:variation') as InjectionKey<WInputVariation>

export function provideVariation(variation: WInputVariation){
    provide(key, variation)
}

export function useVariation(){
    return inject(key, {
        color: 'teal',
        colors: defaultColors,
    })
}