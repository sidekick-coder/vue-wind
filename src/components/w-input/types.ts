export type Rule = (value?: string | number | null) => boolean | string;

export interface Props {
    value: string | number;
    component: string;
    label: string;
    defaultLabelClass: string | string[];
    defaultInputClass: string | string[];
    textColor: string;
    borderColor: string;
    focusBorderColor: string;
    rules: Rule[];
}

export interface Methods {
    validate: () => void;
}

export interface Computed {
    inputModel: string | number | null;
    inputClasses: string[];
}
