export function VWindTransformer(content: string) {
    const windAttr: Record<string, string[]> = {
        color: ["bg", "focus:border"],
        width: ["w"],
        height: ["h"],
        "max-width": ["max-w"],
        "max-height": ["max-h"],
        "min-height": ["min-h"],
        "min-width": ["min-w"],
    };

    const safelist = content
        .split(" ")
        .filter((item) => /(.*)\=["'](.*)["']/.test(item))
        .map((item) => item.replace(/["']/g, "").split("="))
        .filter((item) => Object.keys(windAttr).includes(item[0]))
        .map(([key, value]) =>
            windAttr[key].map((name) => `// ${name}-${value}`)
        )
        .reduce((acc, cur) => acc.concat(cur), [])
        .join("\n");

    return safelist;
}
