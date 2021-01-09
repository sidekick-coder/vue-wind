<template>
    <div :class="['relative',`h-${this.height}`]">
        <div :class="[defaultClasses]">
            <img
                ref="img"
                v-bind="$attrs"
                v-show="!loading"
                @load="setLoadingState"
            />
        </div>
        <div
            v-show="loading"
            :class="[
            'absolute top-0 left-0 flex items-center justify-center w-full h-full', `bg-${backgroundColor}`]">
            loading
        </div>
    </div>
</template>

<script>
export default {
    name: 'WImg',
    props: {
        backgroundColor: {
            type: String,
            default: 'gray-500'
        },
        height: {
            type: [Number, String],
            default: 16
        },
        width: {
            type: [Number, String],
            default: null
        }
    },
    data () {
        return {
            loading: true
        };
    },
    computed: {
        defaultClasses () {
            const classes = [
                'w-img transition delay-150 duration-300 ease-in-out'
            ];
            if (!this.loading) {
                classes.push('loaded');
            }

            if (this.height) {
                classes.push(`h-${this.height}`);
            }

            if (this.width) {
                classes.push(`w-${this.width}`);
            }

            return classes;
        },
        aspectRatio () {
            if (!this.width || !this.height) return null;

            return (this.height / this.width) * 100;
        },
        style () {
            const style = { };

            if (this.width) style.width = `${this.width}px`;

            const applyAspectRatio = this.loading && this.aspectRatio;
            if (applyAspectRatio) {
                style.height = 0;
                style.paddingTop = `${this.aspectRatio}%`;
            }

            return style;
        }
    },
    methods: {
        setLoadingState () {
            setTimeout(this.loading = false, 800);
        }
    }
};
</script>

<style>
.w-img {
  max-width: 100%;
  max-height: 100%;
  width: auto;
  height: auto;
  vertical-align: middle;
  opacity: 0;
}
.w-img.loaded {
    opacity: 1;
}
</style>
