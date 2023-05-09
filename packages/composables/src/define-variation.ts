import { computed, reactive, ref } from 'vue'

interface OptionFunction {
    (value: any): { styles?: any; classes?: any }
}

interface OptionSpecialMethods {
    _shared?: string | OptionFunction
    _empty?: string | OptionFunction
}

interface Options {
    [key: string]: string | OptionFunction
}

type Variant = ReturnType<typeof defineVariation>

export function defineVariation(variationOptions: Options & OptionSpecialMethods = {}) {
    const options = ref(variationOptions)

    let _shared: string | OptionFunction = ''
    let _empty: string | OptionFunction = ''

    function update(variationOptions: Options & OptionSpecialMethods) {
        options.value = variationOptions
    }

    function setShared(value: string | OptionFunction) {
        _shared = value
    }

    function getShared(value?: any) {
        const result = {
            classes: '',
            styles: '',
        }

        if (typeof _shared === 'string') {
            result.classes = _shared
        }

        if (typeof _shared === 'function') {
            Object.assign(result, _shared(value))
        }

        return result
    }

    function onEmpty(value: string | OptionFunction) {
        _empty = value
    }

    function getEmpty(value?: any) {
        const result = {
            classes: '',
            styles: '',
        }

        if (typeof _empty === 'string') {
            result.classes = _empty
        }

        if (typeof _empty === 'function') {
            Object.assign(result, _empty(value))
        }

        return result
    }

    function getVariant(name: string, value?: any) {
        const option = options.value[name]

        const result = {
            classes: '',
            styles: '',
        }

        if (!option) return null

        if (typeof option === 'string') {
            result.classes = option
        }

        if (typeof option === 'function') {
            Object.assign(result, option(value))
        }

        return result
    }

    function mount(value: string) {

        const styles: string[] = []
        const classes: string[] = []

        const variant = getVariant(value)
        const shared = getShared(value)
        const empty = getEmpty(value)

        if (shared) {
            styles.push(shared.styles)
            classes.push(shared.classes)
        }

        if (variant) {
            styles.push(variant.styles)
            classes.push(variant.classes)
        }

        if (!variant && empty) {
            styles.push(empty.styles)
            classes.push(empty.classes)
        }

        return {
            styles: styles.join(' ').trim(),
            classes: classes.join(' ').trim(),
        }

    }

    return reactive({
        mount,
        update,
        setShared,
        onEmpty,
    })
}

export function mountAllVariations(values: [string, Variant][]) {
    const styles: string[] = []
    const classes: string[] = []

    values.forEach(([value, variant]) => {        
        styles.push(variant.mount(value).styles)
        classes.push(variant.mount(value).classes)
    })

    return {
        style: styles.join(' '),
        class: classes.join(' '),
    }
}