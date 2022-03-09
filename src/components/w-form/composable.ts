import { ref, InjectionKey, Ref, inject, provide } from "vue";

interface FormInputValidation {
    (): string | boolean;
}

export interface FormComposable {
    inputs: Ref<FormInputValidation[]>;
}

export const formKey = Symbol("form") as InjectionKey<FormComposable>;

export function provideForm() {
    const form: FormComposable = {
        inputs: ref([]),
    };

    provide(formKey, form);

    return form;
}

export function useForm() {
    return inject(formKey, null);
}
