class StyleBuilder {
    public styles: any = {};

    public add(name: keyof HTMLElement["style"], value: string | number) {
        this.styles[name] = value;
        return this;
    }

    public remove(name: string) {
        delete this.styles[name];
        return this;
    }

    public build() {
        return this.styles;
    }
}

export function useStyleBuilder() {
    return new StyleBuilder();
}
