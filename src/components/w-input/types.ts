export type Rule = (value?: string | number | null) => boolean | string;

export interface Props {
    value: string | number;
    label: string;
    defaultLabelClass: string | string[];
    defaultInputClass: string | string[];
    color: string;
    textColor: string;
    'focus:color': string;
    'focus:textColor': string;
    'error:color': string;
    rules: Rule[];
}

export interface Data {
    errorMessage: string | null;
    component: string;
}

export interface Methods {
    validate: () => boolean;
}

export interface Computed {
    inputModel: string | number | null;
    inputClasses: string[];
    labelClasses: string[];
}
