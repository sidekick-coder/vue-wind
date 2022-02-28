class ClassBuilder {
    public classes: string[] = [];

    public add(...name: string[]) {
        this.classes = [...this.classes, ...name];
        return this;
    }

    public remove(...name: string[]) {
        this.classes = this.classes.filter((c) => !name.includes(c));
        return this;
    }

    public build() {
        return this.classes.join(" ");
    }
}

function useClassBuilder() {
    return new ClassBuilder();
}

export { useClassBuilder };
