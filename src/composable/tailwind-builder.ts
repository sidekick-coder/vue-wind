import { camelCase } from "lodash";
interface Option {
    prop: string;
    class: string;
    default?: string | number;
}

export class TailwindBuilder {
    public options: Option[] = [];
    public staticClasses: string[] = [];

    constructor(public prefix?: string) {}

    public get props() {
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

    public add(
        prop: Option["prop"],
        className: Option["class"],
        defaultValue?: Option["default"]
    ) {
        this.options.push({
            prop: this.prefix ? camelCase(`${this.prefix} ${prop}`) : prop,
            class: className,
            default: defaultValue,
        });

        return this;
    }

    public addStatic(...classNames: string[]) {
        this.staticClasses.push(...classNames);
        return this;
    }

    public make(props: Record<string, any> = {}) {
        return this.options
            .filter((option) => props[option.prop] || option.default)
            .map((option) => option.class + props[option.prop])
            .concat(this.staticClasses);
    }
}

export function useTailwindBuilder(prefix?: string) {
    return new TailwindBuilder(prefix);
}
