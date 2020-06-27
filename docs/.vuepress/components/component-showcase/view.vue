<template>
    <div class="component-showcase-view">
        <h3>
            {{name}}
        </h3>
        <h4>Props</h4>
        <table class="component-props">
            <thead class="headers">
                <tr>
                    <th class="prop-name">Names</th>
                    <th class="prop-types">Types</th>
                    <th class="prop-types">Default</th>
                </tr>
            </thead>
            <tbody>
                <tr
                    :key="propName"
                    v-for="(prop, propName) in props"
                    class="prop-item"
                >
                    <td>
                        <span class="prop-name">{{propName}}</span>
                        <span class="prop-description">{{prop.description}}</span>
                        <span v-if="prop.codeExample">
                            <code class="prop-code-example" v-text="prop.codeExample" />
                        </span>
                    </td>
                    <td>
                        <div class="prop-types">
                            <span class="chip" v-for="type in prop.type">
                                {{type}}
                            </span>
                        </div>
                    </td>
                    <td class="prop-default">{{prop.default || "undefiend"}}</td>
                </tr>
            </tbody>
        </table>
    </div>
</template>

<script>
export default {
    props: {
        name: {
            type: String,
            required: true,
            default: "w-component-name"
        },
        componentData: {
            type: Object,
            required: true,
            default: () => {}
        },
    },
    computed: {
        props(){
            return this.componentData.props || [];
        }
    },
    mounted(){

    }
}
</script>

<style lang="stylus" scoped>
.component-showcase-view {
    border: 1px solid $borderColor;
    padding: 2rem;
    h3, h4 {
        margin-top: 0;
        margin-bottom: 1rem;
    }
}
.component-props {
    display: inline-table;
    width: 100%;
    .headers {
        text-align: left;
        .prop-name {
            font-weight: bold;
            width 50%;
        }
    }
    .prop-item {
        span {

        }
        .prop-name {
            font-weight: bold;
            margin-bottom 0.4rem; 
            display: block;
        }
        .prop-description, {
            font-size: 0.8rem;
            margin-bottom 0.4rem; 
            display: block;
        }

        .prop-types, .prop-default {
            font-size: 0.9rem;
        }

        .prop-code-example {
            background-color $codeBgColor
            color: $borderColor            
        }
    }
    .chip {
        padding: 0.3rem 0.5rem;
        margin 0 0.3rem;
        background-color $badgeTipColor
        color: $borderColor
        border-radius 0.2rem;
    }
}
</style>