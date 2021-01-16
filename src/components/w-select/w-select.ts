import WInput from '../w-input';

export default WInput.extend<any, any, any, any>({
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
        this.children = this.items.map((item: any) => ({
            component: 'option',
            content: item,
            attrs: {
                value: item,
                selected: item === this.value
            }
        }));
    }
});
