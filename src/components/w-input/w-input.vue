<template>
  <div v-on="$listeners">
    <div>
      <label v-if="label" :class="[defaultLabelClass, errorMessage ? 'text-red-500' : '']">
        {{label}}
        <component
            :is='component'
            v-bind="$attrs"
            :class="['mt-2', inputClasses]"
            :value='lazyValue'
            @input="e => inputModel = e.target.value"
        />
      </label>
      <component
        v-else
        :is='component'
        v-bind="$attrs"
        :class="inputClasses"
        :value='lazyValue'
        @input="e => inputModel = e.target.value"
        />
    </div>
    <w-transition-slide-down>
      <div class="my-2 text-red-500 text-xs" v-if="errorMessage">
        {{errorMessage}}
      </div>
    </w-transition-slide-down>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import { Props, Computed, Methods } from './types';

interface Data {
  errorMessage: string | null;
  lazyValue: string | number | null;
}

export default Vue.extend<Data, Methods, Computed, Props>({
    name: 'WInput',
    props: {
        value: {
            type: [String, Number],
            required: false,
            default: null
        },
        component: {
            type: String,
            required: false,
            default: 'input'
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
                'py-2 px-3',
                'border'
            ]
        },
        textColor: {
            type: String,
            required: false,
            default: 'gray-700'
        },
        borderColor: {
            type: String,
            required: false,
            default: 'gray-300'
        },
        focusBorderColor: {
            type: String,
            required: false,
            default: 'teal-500'
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
        }
    },
    model: {
        event: 'update:value'
    },
    data () {
        return {
            errorMessage: null,
            lazyValue: this.value
        };
    },
    computed: {
        inputModel: {
            get () {
                return this.lazyValue;
            },
            set (value) {
                this.lazyValue = value;
                this.validate();
                this.$emit('update:value', value);
            }
        },
        inputClasses () {
            const classes = [];
            const defaultClasses = Array.isArray(this.defaultInputClass) ? this.defaultInputClass : [this.defaultInputClass];

            if (this.errorMessage) {
                classes.push('border-red-500', 'text-red-500');
            } else {
                classes.push(
                    `border-${this.borderColor}`,
                    `text-${this.textColor}`,
                    `focus:boder-${this.focusBorderColor}`
                );
            }

            return classes.concat(defaultClasses);
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
