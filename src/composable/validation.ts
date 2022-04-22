import { ref } from "vue";
export interface ValidationRule {
    (value: string): boolean | string;
}

export interface CallBack {
    (): [boolean, string[]];
}

export function useValidation(rules: ValidationRule[]) {
    const messages = ref<string[]>([]);

    function validate(value: string) {
        messages.value = [];

        rules.forEach((rule) => {
            const message = rule(value);

            if (typeof message === "string") {
                messages.value.push(message);
            }
        });

        return messages.value.length === 0;
    }

    function reset() {
        messages.value = [];
    }

    return {
        messages,
        validate,
        reset,
    };
}
