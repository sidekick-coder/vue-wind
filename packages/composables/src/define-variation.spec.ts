import { test, expect, describe } from 'vitest'
import { reactive } from 'vue'

import { defineVariation } from './define-variation'

describe('define-variation (unit)', () => {
    test('should return correct variation classes', () => {
        const variant = defineVariation({
            accent: 'bg-accent',
            info: 'bg-info',
        })

        const accent = variant.mount('accent')

        expect(accent.classes).toBe('bg-accent')

        const info = variant.mount('info')

        expect(info.classes).toBe('bg-info')
    })

    test('should be able to use function as variation', () => {
        const variant = defineVariation({
            accent: () => ({ classes: 'bg-accent', styles: 'color: var(--accent)' }),
        })

        const accent = variant.mount('accent')

        expect(accent.classes).toBe('bg-accent')
        expect(accent.styles).toBe('color: var(--accent)')
    })

    test('should add shared classes between variations ', () => {
        const variant = defineVariation({
            accent: 'bg-accent',
            info: 'bg-info',
        })

        variant.setShared('border')

        const accent = variant.mount('accent')

        expect(accent.classes).toBe('border bg-accent')

        const info = variant.mount('info')

        expect(info.classes).toBe('border bg-info')
    })

    test('should add shared styles between variations ', () => {
        const variant = defineVariation({
            accent: () => ({ styles: 'color: var(--accent);' }),
            info: () => ({ styles: 'color: var(--info);' }),
        })

        variant.setShared(() => ({ styles: 'font-weight:bold;' }))

        const accent = variant.mount('accent')

        expect(accent.styles).toBe('font-weight:bold; color: var(--accent);')

        const info = variant.mount('info')

        expect(info.styles).toBe('font-weight:bold; color: var(--info);')
    })

    test('should use _empty classes & styles when variation was not found ', () => {
        const variant = defineVariation({
            _empty: 'text-gray',
        })

        variant.onEmpty(() => ({ classes: 'text-gray', styles: 'color: grey' }))

        const unknown = variant.mount('unknown')

        expect(unknown.classes).toBe('text-gray')
        expect(unknown.styles).toBe('color: grey')
    })

    test('should update variations options', () => {
        const variant = defineVariation({
            accent: 'bg-accent',
            info: 'bg-info',
        })

        variant.setShared('border')

        const accent = variant.mount('accent')

        expect(accent.classes).toBe('border bg-accent')

        variant.update({
            accent: 'text-accent',
            info: 'text-info',
        })

        variant.setShared('font-bold')

        const accentUpdated = variant.mount('accent')

        expect(accentUpdated.classes).toBe('font-bold text-accent')

        const infoUpdated = variant.mount('info')

        expect(infoUpdated.classes).toBe('font-bold text-info')
    })

    test('should use _shared & empty at same type options', () => {
        const variant = defineVariation()

        variant.setShared('border')

        variant.onEmpty((v) => ({ classes: v }))

        const unknown = variant.mount('text-unknown')

        expect(unknown.classes).toBe('border text-unknown')
    })
})