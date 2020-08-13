<template>
  <div v-on="$listeners">
    <div>
      <label v-if="label" :class="labelClasses">
        {{label}}
        <component
            :is='component'
            v-bind="$attrs"
            :class="['mt-2', inputClasses]"
            :value='inputModel'
            @input="e => inputModel = e.target.value"
        />
      </label>
      <component
        v-else
        :is='component'
        v-bind="$attrs"
        :class="inputClasses"
        :value='inputModel'
        @input="e => inputModel = e.target.value"
        />
    </div>
    <w-transition-slide-down>
      <div
        v-if="errorMessage"
        class="my-2 text-red-500 text-xs"
        v-text="errorMessage" />
    </w-transition-slide-down>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';

import WTransitionSlideDown from '../w-transition/slide-down.vue';
import { Props, Computed, Methods, Data } from './types';

export default Vue.extend<Data, Methods, Computed, Props>({
    name: 'WInput',
    components: {
        WTransitionSlideDown
    },
    props: {
        value: {
            type: [String, Number],
            required: false,
            default: ''
        },
        label: {
            type: String,
            required: false,
            default: null
        },
        defaultLabelClass: {
            type: [Array, String, Object],
            required: false,
            default: () => [
                'block text-gray-700 text-sm font-bold'
            ]
        },
        defaultInputClass: {
            type: [Array, String, Object],
            required: false,
            default: () => [
                'appearance-none focus:outline-none',
                'shadow rounded w-full leading-tight',
                'transition-border-color duration-200',
                'py-2 px-3',
                'border'
            ]
        },
        color: {
            type: String,
            required: false,
            default: 'gray-300'
        },
        textColor: {
            type: String,
            required: false,
            default: 'gray-800'
        },
        'focus:color': {
            type: String,
            required: false,
            default: 'blue-500'
        },
        'focus:textColor': {
            type: String,
            required: false,
            default: 'gray-800'
        },
        'error:color': {
            type: String,
            required: false,
            default: 'red-500'
        },
        rules: {
            type: Array,
            required: false,
            default: () => []
        }
    },
    docs: {
        events: {
            'update:value': {
                description: 'update model value'
            }
        },
        methods: {
            validate: {
                description: 'validate value and show errors',
                returns: 'boolean'
            }
        }
    },
    model: {
        event: 'update:value'
    },
    data () {
        return {
            errorMessage: null,
            component: 'input'
        };
    },
    computed: {
        inputModel: {
            get () {
                return this.value;
            },
            set (value) {
                this.$emit('update:value', value);
            }
        },
        inputClasses () {
            const classes = [];
            const defaultClasses = Array.isArray(this.defaultInputClass) ? this.defaultInputClass : [this.defaultInputClass];

            if (this.errorMessage) {
                classes.push(
                    `border-${this['error:color']}`,
                    `text-${this['error:color']}`
                );
            } else {
                classes.push(
                    `border-${this.color}`,
                    `text-${this.textColor}`,
                    `focus:border-${this['focus:color']}`,
                    `focus:text-${this['focus:textColor']}`
                );
            }

            return classes.concat(defaultClasses);
        },
        labelClasses () {
            const classes = [];
            const defaultClasses = Array.isArray(this.defaultLabelClass) ? this.defaultLabelClass : [this.defaultLabelClass];

            if (this.errorMessage) {
                classes.push(
                    `text-${this['error:color']}`
                );
            } else {
                classes.push(
                    `text-${this.color}`
                );
            }

            return classes.concat(defaultClasses);
        }
    },
    watch: {
        inputModel () {
            this.validate();
        }
    },
    methods: {
        validate () {
            this.errorMessage = null;
            const valid = this.rules.reduce<boolean | string>((isValid, rule) => {
                if (typeof isValid === 'string') {
                    return isValid;
                }
                return rule(this.inputModel);
            }, true);

            if (typeof valid === 'string') {
                this.errorMessage = valid;
                return false;
            }

            return valid;
        }
    }
});
</script>

<style>

</style>
