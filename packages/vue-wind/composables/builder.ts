class Builder {
    private _classes: string[] = [];
    private _child = new Map<string, ReturnType<typeof useBuilder>>();

    public add(...args: string[]){
        const notAdded = args.filter(arg => !this._classes.includes(arg));

        this._classes.push(...notAdded);

        return this;
    }

    public remove(...args: string[]){
        this._classes = this._classes.filter(c => !args.includes(c));

        return this;
    }

    public createChild(name: string) {
        if (!this._child.has(name))  this._child.set(name, new Builder());

        return this._child.get(name) as Builder;
    }
    
    public child(name: string) {
        const child = this._child.get(name);
        
        if (!child) throw new Error(`Child ${name} not found`);

        return child
    }

    public toggler(name: string, value: boolean) {
        if (value) this.add(name);

        return this;
    }

    public makeArray(): string[] {
        return this._classes
    }
    
    public make(): string {
        return this.makeArray().join(" ");
    }

    public makeChild(...names: string[]) {
        const child = names.map(name => this.child(name))

        return child.map(c => c.make()).join(" ");
    }
}

export function useBuilder() {
    return new Builder();
}