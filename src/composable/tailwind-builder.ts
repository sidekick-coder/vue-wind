import { defineProps as baseDefineProps } from "vue";

interface Option {
    prop: string;
    class: string;
    default?: string | number;
}

export class TailwindBuilder {
    public options: Option[] = [];

    public add(
        prop: Option["prop"],
        className: Option["class"],
        defaultValue?: Option["default"]
    ) {
        this.options.push({
            prop,
            class: className,
            default: defaultValue,
        });

        return this;
    }

    public make(props: Record<string, Option["default"]>) {
        return this.options.map((option) => option.class + props[option.prop]);
    }

    public optionsToVueProps() {
        return this.options.reduce(
            (result, option) => ({
                ...result,
                [option.prop]: {
                    type: [String, Number],
                    default: option.default,
                },
            }),
            {}
        );
    }

    public withProps<T = {}>(defineProps: typeof baseDefineProps, props?: T) {
        const allProps = {
            ...this.optionsToVueProps(),
            ...props,
        };

        return defineProps<typeof allProps>(allProps);
    }
}

export function useTailwindBuilder() {
    return new TailwindBuilder();
}
