<template>
    <div>
        <table class="table table-auto w-full shadow">
            <thead>
                <tr v-if="headers">
                    <th
                        v-for="(header, index) in headers"
                        :key="index"
                        :class="[headerItemsDefaultClasses, header.class]"
                        v-text="header.name"
                    />
                </tr>
            </thead>
            <tbody>
                <template v-if="!items || items.length === 0">
                    <tr :class="itemsTrDefaultClasses">
                        <td
                            :class="[itemsTdDefaultClasses, 'text-center']"
                            :colspan="headers.length || 1"
                        >
                            <slot name="empty-items">No items</slot>
                        </td>
                    </tr>
                </template>
                <template v-else>
                    <tr
                        v-for="(item, index) in items"
                        :key="index"
                        :class="itemsTrDefaultClasses"
                        @click="$emit('click:item')"
                    >
                    <template v-for="value in valuesNames">
                        <td
                            :key="index + value"
                            :class="[itemsTdDefaultClasses]"
                        >
                            <slot :name="`item.${value}`" :item="item">{{ item[value] }}</slot>
                        </td>
                    </template>
                    </tr>
                </template>
            </tbody>
        </table>
    </div>
</template>

<script lang="ts">
import Vue from 'vue';
import { Header } from './types';

export interface Props {
    headers: Header[],
    items: object[],
    headerItemsDefaultClasses: string | string[] | object,
    itemsTrDefaultClasses: string | string[] | object,
    itemsTdDefaultClasses: string | string[] | object,
}

export default Vue.extend<{}, {}, {}, Props>({
    name: 'WDataTable',
    props: {
        headers: {
            type: Array,
            description: 'Array of headers in format { name: string, value: string; }',
            required: false,
            default: () => []
        },
        items: {
            type: Array,
            required: false,
            default: () => []
        },
        headerItemsDefaultClasses: {
            type: [String, Array, Object],
            default: () => [
                'px-5', 'py-3', 'text-left', 'text-gray-600', 'text-sm'
            ]
        },
        itemsTrDefaultClasses: {
            type: [String, Array, Object],
            default: () => [
                'border-b', 'border-t'
            ]
        },
        itemsTdDefaultClasses: {
            type: [String, Array, Object],
            default: () => [
                'px-5', 'py-3', 'text-gray-600', 'text-sm'
            ]
        }
    },
    docs: {
        events: {
            'click:item': {
                description: 'Emited when click in a table item'
            }
        }
    },
    computed: {
        valuesNames () {
            return this.headers.map((header) => header.value);
        }
    }
});
</script>
