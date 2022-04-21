export function VWindTransformer(content: string) {
    const windAttr: Record<string, string[]> = {
        color: ["bg", "focus:border"],
        width: ["w"],
        height: ["h"],
        "max-width": ["max-w"],
        "max-height": ["max-h"],
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
