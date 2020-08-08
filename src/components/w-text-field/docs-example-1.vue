<template>
  <div>
      <w-text-field v-model="name" label='Name' placeholder='Type your name' />
      <div class="text-center my-4">
        My name is: <strong>{{name}}</strong>
      </div>
  </div>
</template>

<script>
export default {
    data () {
        return {
            name: ''
        };
    }
};
</script>

<style>

</style>
