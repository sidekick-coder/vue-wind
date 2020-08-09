<template>
  <div>
      <w-text-field
        v-model='model'
        label='Min 5 characters max 10 characters'
        :rules='rules'
        placeholder="Type a text" />
  </div>
</template>

<script>
export default {
    data: () => ({
        model: '',
        rules: [
            (value) => {
                return value.length >= 5 || 'Min 5 characters';
            },
            (value) => {
                return value.length <= 10 || 'Max 10 characters';
            }
        ]
    })
};
</script>
