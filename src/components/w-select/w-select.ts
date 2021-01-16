import WInput from '../w-input';

export default WInput.extend({
    name: 'WSelect',
    props: {
        items: {
            type: Array,
            default: () => []
        }
    },
    data () {
        return {
            component: 'select'
        };
    },
    created () {
        this.childrens = this.items.map(item => ({
            component: 'option',
            content: item,
            attrs: {
                value: item,
                selected: item === this.value
            }
        }));
    }
});
