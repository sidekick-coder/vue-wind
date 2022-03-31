export function VWindTransformer(content: string) {
    const windAttr: Record<string, string> = {
        color: "bg",
        width: "w",
        height: "h",
        "max-width": "max-w",
        "max-height": "max-h",
    };

    const safelist = content
        .split(" ")
        .filter((item) => /(.*)\=["'](.*)["']/.test(item))
        .map((item) => item.replace(/["']/g, "").split("="))
        .filter((item) => Object.keys(windAttr).includes(item[0]))
        .map(([name, value]) => `// ${windAttr[name]}-${value} `)
        .join("\n");

    return safelist;
}
