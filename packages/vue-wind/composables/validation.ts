import { ref } from "vue";
export interface ValidationRule {
    (value: any): boolean | string;
}

export interface CallBack {
    (): [boolean, string[]];
}

export function useValidation(rules: ValidationRule[]) {
    const state = ref({
        messages: [] as string[],
        validate: (_: any) => true as boolean,
        reset: () => {}
    });

    state.value.validate = (value: any) => {
        state.value.messages = [];

        rules.forEach((rule) => {
            const message = rule(value);

            if (typeof message === "string") {
                state.value.messages.push(message);
            }
        });

        return state.value.messages.length === 0;
    }

    state.value.reset = () => state.value.messages = [];

    return state
}
