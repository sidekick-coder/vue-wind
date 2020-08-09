<script>
import Vue from 'vue';

export default Vue.extend({
    functional: true,
    render (createElement, { children }) {
        const data = {
            props: {
                name: 'w-slide-down'
            }
        };
        return createElement('transition', data, children);
    }
});
</script>

<style>
.w-slide-down-enter-active, .w-slide-down-leave-active {
  transition: all .3s ease-in-out;
  max-height: 100px;
  overflow: hidden;
}
.w-slide-down-enter, .w-slide-down-leave-to {
  max-height: 0;
  overflow: hidden;
}
</style>
