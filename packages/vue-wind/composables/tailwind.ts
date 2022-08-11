interface Option {
    name: string;
    class: string;
    default?: string | number;
    isProp?: boolean;
    isToggle?: boolean;
}

export class Builder {
    private _options: Option[] = [];
    private _child = new Map<string, Builder>();

    public get props() {
        const props: Record<string, any> = {};

        this._options
            .filter((option) => option.isProp)
            .forEach((option) => {
                props[option.name] = {
                    type: String,
                    default: option.default,
                };
            });

        return {
            ...props,
            modify: {
                type: Function,
                default: null,
            },
        };
    }

    public option(
        name: Option["name"],
        className: Option["class"],
        defaultValue?: Option["default"]
    ) {
        this._options.push({
            name,
            class: className,
            default: defaultValue,
            isProp: true,
        });

        return this;
    }

    public static(...classNames: string[]) {
        const options = classNames
            .map((c) => c.split(" "))
            .flat()
            .filter((c) => !this._options.some((o) => o.class === c))
            .map((className) => ({
                name: className,
                class: className,
            }));

        this._options.push(...options);

        return this;
    }

    public remove(name: string) {
        this._options = this._options.filter((option) => option.name !== name);

        return this;
    }

    public makeArray(props: any = {}) {
        if (props.modify && typeof props.modify === "function") {
            props.modify(this);
        }

        const propOptions = this._options
            .filter((option) => option.isProp)
            .filter((option) => props[option.name] || option.default)
            .map((option) =>
                [option.class, props[option.name] || option.default].join("-")
            );

        const toggleOptions = this._options
            .filter((option) => option.isToggle)
            .map((option) => (props[option.name] ? option.class : ""))
            .filter((className) => className !== "");

        const staticOptions = this._options
            .filter((option) => !option.isProp)
            .filter((option) => !option.isToggle)
            .map((option) => option.class);

        return staticOptions.concat(propOptions).concat(toggleOptions);
    }

    public make(props: Record<string, any> = {}) {
        const classes = this.makeArray(props);

        return classes.join(" ");
    }

    public toggle(name: string, className: string) {
        this._options.push({
            name: name,
            class: className,
            isToggle: true,
        });

        return this;
    }

    public child(name: string) {
        let child = this._child.get(name);

        if (!child) {
            child = new Builder();
            this._child.set(name, child);
        }

        return child;
    }
    /**
     * @props Object with main props
     * @childProps Object with props for child builders Ex. { label: { color: "red" }, small: { fontSize: "sm" } }
     */
    public all(props: any = {}) {
        const classes = this.makeArray(props);

        const toggles = this._options
            .filter((option) => option.isToggle)
            .map((o) => o.class);

        const child = Array.from(this._child.values())
            .map((builder) => builder.makeArray(props))
            .reduce((acc, childClasses) => acc.concat(childClasses), []);

        return classes.concat(toggles).concat(child).join(" ");
    }

    public modify(fn: (builder: Builder) => void) {
        fn(this);

        return this;
    }
}

export function useBuilder() {
    return new Builder();
}
