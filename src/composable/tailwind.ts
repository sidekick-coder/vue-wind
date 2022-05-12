interface Option {
    name: string;
    class: string;
    default?: string | number;
    isProp?: boolean;
    isToggle?: boolean;
}

export class Builder {
    public options: Option[] = [];

    public get props() {
        const props: Record<string, any> = {};

        this.options
            .filter((option) => option.isProp)
            .forEach((option) => {
                props[option.name] = {
                    type: String,
                    default: option.default,
                };
            });

        return props;
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
            isProp: true,
        });

        return this;
    }

    public static(...classNames: string[]) {
        const options = classNames.map((className) => ({
            name: "",
            class: className,
        }));

        this.options.push(...options);

        return this;
    }

    public makeArray(
        props: Record<string, any> = {},
        ignoreToggleValues = false
    ) {
        const propOptions = this.options
            .filter((option) => option.isProp)
            .filter((option) => props[option.name] || option.default)
            .map((option) => [option.class, props[option.name]].join("-"));

        const toggleOptions = this.options
            .filter((option) => option.isToggle)
            .map((option) =>
                ignoreToggleValues || props[option.name] ? option.class : ""
            )
            .filter((className) => className !== "");

        const staticOptions = this.options
            .filter((option) => !option.isProp)
            .filter((option) => !option.isToggle)
            .map((option) => option.class);

        return staticOptions.concat(propOptions).concat(toggleOptions);
    }

    public make(props: Record<string, any> = {}, includeToggles = false) {
        const classes = this.makeArray(props, includeToggles);

        return classes.join(" ");
    }

    public toggle(name: string, className: string) {
        this.options.push({
            name: name,
            class: className,
            isToggle: true,
        });
    }
}

export function useBuilder() {
    return new Builder();
}
