import { mount, MountOptions } from '@vue/test-utils';
import { expect } from 'chai';
import faker from 'faker';

import WSelect from './w-select';

describe.only('w-select (unit)', () => {
    const component = (data?: MountOptions<InstanceType<typeof WSelect>>) => mount(WSelect, data);

    it('should have select element', () => {
        const wrapper = component({
            stubs: { WInput: true }
        });

        expect(wrapper.find('select').exists()).to.be.equal(true);
    });

    it('should bind props in w-input component', () => {
        const randomClass = faker.lorem.words(5);

        const wrapper = component({
            propsData: { defaultInputClass: randomClass }
        });

        expect(wrapper.find('select').attributes('class')).to.includes(randomClass);
    });

    it('should bind v-model value in input', async () => {
        const randomValue = faker.lorem.words(5);
        const wrapper = mount({
            data () {
                return { model: '', items: [randomValue] };
            },
            components: { WSelect },
            template: `
            <div>
                <w-select v-model='model' :items='items' />
            </div>`
        });

        wrapper.find('select').setValue(randomValue);

        await wrapper.vm.$nextTick();

        expect(wrapper.html()).to.includes(`value="${randomValue}"`);
    });

    it('should create an option for each item in props', async () => {
        const items = [
            faker.lorem.word(),
            faker.lorem.word(),
            faker.lorem.word(),
            faker.lorem.word()
        ];

        const wrapper = mount({
            data () {
                return { model: '', items: items };
            },
            components: { WSelect },
            template: `
            <div>
                <w-select v-model='model' :items='items' />
            </div>`
        });

        const options = wrapper.findAll('option');

        await wrapper.vm.$nextTick();

        expect(options.length).to.be.equal(items.length);
    });
});
