import { Builder } from "./composable/tailwind";

export function VWindTransformer(content: string) {
    const files = import.meta.globEager("./components/**/*.vue");

    const builders = Object.entries(files).map(([path, file]) => ({
        name: path.split("/").pop()?.replace(".vue", ""),
        instance: file.builder ? (file.builder as Builder) : undefined,
    }));

    const results = Array.from(content.matchAll(/<w-[^>]+>/gi)).map(
        (match) => match[0]
    );

    if (!results) {
        return "";
    }

    const safelist = results
        .map((r) => r.replace(/<|>/g, ""))
        .map((r) => r.replace(/\n/g, ""))
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

            return builder?.instance?.all(attrs, true) || "";
        });

    return safelist.join(" ");
}
