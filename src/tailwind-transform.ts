const files = import.meta.globEager("./components/**/*.vue");

export function VWindTransformer(content: string) {
    const builders = Object.entries(files).map(([path, file]) => ({
        name: path.split("/").pop()?.replace(".vue", ""),
        make: file.builder ? file.builder.make.bind(file.builder) : () => "",
    }));

    const results = /<w-[^>]+>/.exec(content.trim().replace(/\n/g, " "));

    if (!results) {
        return "";
    }

    const safelist = results
        .map((r) => r.replace(/<|>/g, ""))
        .map((result: string) => {
            const name = result.split(" ")[0];
            const builder = builders.find((builder) => builder.name === name);

            const attrs = result
                .replace(/'|"/g, "")
                .split(" ")
                .filter((attr) => attr !== "")
                .slice(1)
                .map((a) => a.trim().split("="))
                .reduce((acc, [key, value]) => ({ ...acc, [key]: value }), {});

            return builder?.make(attrs, true) || "";
        });

    return safelist.join(" ");
}
