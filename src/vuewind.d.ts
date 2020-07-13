import Vue from 'vue';
import { PluginOptions } from './types';

declare module 'vue/types/vue' {
  interface Vue {
    $vuewind: {
      options?: PluginOptions
    }
  }
}

declare module 'vue/types/options' {
  interface PropOptions {
    description?: string;
  }

  interface ComponentOptions<V extends Vue> {
    docs?: {
      events?: {
        [prop: string]: {
          description: string
        }
      }
    };
}
}
