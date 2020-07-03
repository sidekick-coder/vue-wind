<template>
  <w-transition-fade-in>
      <div v-if="dialog" class="fixed inset-0 z-10 flex flex-col items-center justify-center">
          <div :class="overlayClass" @click="toggleDialog"></div>
          <div :class="[contentClass,`w-${this.width}`,`max-w-${this.maxWidth}`]">
            <slot />
          </div>
      </div>
  </w-transition-fade-in>
</template>

<script lang="ts">
import Vue from 'vue';
import WTransitionFadeIn from './../w-transition/fade-in.vue';
import { Data, Computed, Props } from './types';

export default Vue.extend<Data, {}, Computed, Props>({
    components: {
        WTransitionFadeIn
    },
    props: {
        value: {
            type: Boolean,
            default: false
        },
        width: {
            type: String,
            default: 'full'
        },
        maxWidth: {
            type: String,
            default: 'none'
        },
        overlayClass: {
            type: [String, Array, Object],
            default: () => [
                'bg-opacity-50 bg-black',
                'absolute inset-0'
            ]
        },
        contentClass: {
            type: [String, Array, Object],
            default: () => [
                'z-20',
                'p-4'
            ]
        }
    },
    model: {
        prop: 'value',
        event: 'input'
    },
    data () {
        return {
            show: this.value
        };
    },
    computed: {
        dialog: {
            get () {
                return this.value;
            },
            set (value) {
                this.$emit('input', value);
            }
        }
    },
    methods: {
        toggleDialog () {
            this.dialog = !this.dialog;
        }
    }
});

</script>
