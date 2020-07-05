<template>
  <w-transition-fade-in>
      <div v-if="dialog" :class="['w-dialog',dialogClass]">
          <div :class="['w-dialog-overlay', overlayClass]" @click="dialog = false"></div>
          <div :class="['w-dialog-content',contentClass,`w-${width}`,`max-w-${maxWidth}`]">
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
        dialogClass: {
            type: [String, Array, Object],
            default: () => [
                'fixed inset-0 z-30',
                'flex flex-col items-center justify-center'
            ]
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
                'z-40',
                'p-4'
            ]
        }
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
    }
});

</script>
