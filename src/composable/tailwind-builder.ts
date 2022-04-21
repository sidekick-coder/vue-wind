interface Option {
    name: string;
    class: string;
    default?: string | number;
}

export class TailwindBuilder {
    public options: Option[] = [];
    public staticClasses: string[] = [];

    constructor() {}

    public add(
        name: Option["name"],
        className: Option["class"],
        defaultValue?: Option["default"]
    ) {
        this.options.push({
            name,
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
            .filter((option) => props[option.name] || option.default)
            .map((option) => option.class + props[option.name])
            .concat(this.staticClasses);
    }
}

export function useTailwindBuilder() {
    return new TailwindBuilder();
}
