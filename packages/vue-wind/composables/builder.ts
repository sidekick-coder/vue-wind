class Builder {
    private _classes: string[] = [];
    private _child = new Map<string, ReturnType<typeof useBuilder>>();

    public add(...args: string[]){
        this._classes.push(...args);

        return this;
    }

    public remove(...args: string[]){
        this._classes = this._classes.filter(c => !args.includes(c));

        return this;
    }

    
    public makeArray(): string[] {
        const childClasses = Array.from(this._child.values()).map(c => c.make());

        return this._classes.concat(childClasses);
    }
    
    public make(): string {
        return this.makeArray().join(" ");
    }

    public child(name: string) {
        if (!this._child.has(name))  this._child.set(name, new Builder());

        return this._child.get(name) as Builder;
    }

    public toggler(name: string, value: boolean) {
        if (value) this.add(name);

        return this;
    }
}

export function useBuilder() {
    return new Builder();
}