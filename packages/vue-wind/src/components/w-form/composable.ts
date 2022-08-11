import { ref, Ref, inject, provide } from "vue";

interface FormInputValidation {
    (): string | boolean;
}
interface FormInputResetValidation {
    (): void;
}

export interface FormComposable {
    inputs: Ref<FormInputValidation[]>;
    resets: Ref<FormInputResetValidation[]>;
}

export const formKey = "wind:form";

export function provideForm() {
    const form: FormComposable = {
        inputs: ref([]),
        resets: ref([]),
    };

    provide(formKey, form);

    return form;
}

export function useForm() {
    return inject<FormComposable | null>(formKey, null);
}
