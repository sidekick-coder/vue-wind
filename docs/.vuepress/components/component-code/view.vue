<template>
    <w-card>
      <div class="flex border-b">
        <template v-for='(item, index) in items'>
          <w-btn
            v-if="$slots[item]"
            :key="index"
            v-text="capitalize(item)"
            :text='index !== tab'
            @click='tab = index'
          />
        </template>
        </div>
      </div>
      <w-card-content>
        <slot />
        <template v-for='(item, index) in items'>
          <div :key="index" v-if='index === tab && $slots[item]'>
            <slot :name="item"/>
          </div>
        </template>
      </w-card-content>
    </w-card>
</template>

<script>
import capitalize from 'lodash/capitalize';
export default {
  data(){
    return {
      tab: 0,
      capitalize,
      items: [
        "template",
        "script",
        "typescript"
      ]
    }
  }
}
</script>

<style>

</style>