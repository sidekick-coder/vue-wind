interface Option {
    name: string;
    class: string;
    default?: string | number;
}

export class Builder {
    public options: Option[] = [];
    public staticClasses: string[] = [];

    public get props() {
        return this.options.reduce(
            (acc, option) => ({
                ...acc,
                [option.name]: {
                    type: String,
                    default: option.default,
                },
            }),
            {}
        );
    }

    public option(
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

    public static(...classNames: string[]) {
        this.staticClasses.push(...classNames);
        return this;
    }

    public makeArray(props: Record<string, any> = {}) {
        return this.options
            .filter((option) => props[option.name] || option.default)
            .map((option) => [option.class, props[option.name]].join("-"))
            .concat(this.staticClasses);
    }

    public make(props: Record<string, any> = {}) {
        return this.makeArray(props).join(" ");
    }
}

export function useBuilder() {
    return new Builder();
}
