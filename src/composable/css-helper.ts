function isPixelMeasure(value: string): boolean {
    return value.endsWith("px");
}

function isPercentageMeasure(value: string): boolean {
    return value.endsWith("%");
}

function toMeasure(value: number | string, unit = "px") {
    if (isPixelMeasure(value.toString())) {
        return String(value);
    }

    if (isPercentageMeasure(value.toString())) {
        return String(value);
    }

    return [value, unit].join("");
}

export function useCssHelper() {
    return {
        toMeasure,
    };
}
