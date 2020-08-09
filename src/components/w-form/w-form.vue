<template>
    <form v-bind="$attrs" v-on="$listeners">
        <slot />
    </form>
</template>

<script>
export default {
    data () {
        return {
            inputs: []
        };
    },
    docs: {
        methods: {
            validate: {
                description: 'validate child inputs',
                returns: 'void'
            }
        }
    },
    mounted () {
        const inputNames = ['WInput'];
        this.inputs = this.$children
            .filter(child => inputNames.includes(child.$options.name));
    },
    beforeDestroy () {
        this.inputs = [];
    },
    methods: {
        validate () {
            return this.inputs.reduce((isValid, input) => {
                if (!input.validate()) {
                    return false;
                }
                return isValid;
            }, true);
        }
    }
};
</script>

<style>

</style>
