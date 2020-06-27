<template>
    <Layout>
        <template slot="page-top">
            <div class="page-top theme-default-content">
                <template v-if="components">
                    <div v-for="(item, name) in components">
                        <component-showcase-view
                            :name="name"
                            :component-data="item"
                        />
                    </div>
                </template>
            </div>
        </template>
  </Layout>
</template>

<script>
import Vue from 'vue';

export default {
    data () {
        return {
            componentsDefinition: null,
            components: null,
        }
    },
    created(){
        this.load();
    },
    methods: {
        async load(){
            if (this.$page.frontmatter.jsonFile) {
                this.components = this.$page.frontmatter.jsonFile.components;
                this.componentsDefinition = this.$page.frontmatter.jsonFile;
            }
        }
    }
}
</script>