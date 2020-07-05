<script>
import Vue from 'vue';

export default Vue.extend({
    functional: true,
    render (createElement, { children }) {
        const data = {
            props: {
                name: 'w-fade'
            }
        };
        return createElement('transition', data, children);
    }
});
</script>

<style>
.w-fade-enter-active, .w-fade-leave-active {
  transition: opacity .3s;
}
.w-fade-enter, .w-fade-leave-to {
  opacity: 0;
}
</style>
