interface Option {
    name: string;
    class: string;
    default?: string | number;
}

export class Builder {
    public options: Option[] = [];
    public staticClasses: string[] = [];

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

    public make(props: Record<string, any> = {}) {
        return this.options
            .filter((option) => props[option.name] || option.default)
            .map((option) => [option.class, props[option.name]].join("-"))
            .concat(this.staticClasses)
            .join(" ");
    }
}

export function useBuilder() {
    return new Builder();
}
