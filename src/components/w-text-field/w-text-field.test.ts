import { mount, MountOptions } from '@vue/test-utils';
import { expect } from 'chai';
import faker from 'faker';

import WTextField from './w-text-field';

describe('w-text-field (unit)', () => {
    const component = (data?: MountOptions<InstanceType<typeof WTextField>>) => mount(WTextField, data);

    it('should have input element', () => {
        const wrapper = component({
            stubs: { WInput: true }
        });

        expect(wrapper.find('input').exists()).to.be.equal(true);
    });

    it('should ignore component prop', () => {
        const wrapper = component({
            propsData: { component: 'textarea' }
        });

        expect(wrapper.find('input').exists()).to.be.equal(true);
    });

    it('should bind props in w-input component', () => {
        const randomClass = faker.lorem.words(5);

        const wrapper = component({
            propsData: { component: 'textarea', defaultInputClass: randomClass }
        });

        expect(wrapper.html()).to.includes(randomClass);
    });

    it('should bind v-model value in input', async () => {
        const randomValue = faker.lorem.words(5);
        const wrapper = mount({
            data () {
                return { model: '' };
            },
            components: { WTextField },
            template: `
            <div>
                <w-text-field v-model='model' />
            </div>`
        });

        wrapper.find('input').setValue(randomValue);

        await wrapper.vm.$nextTick();

        expect(wrapper.html()).to.includes(`value="${randomValue}"`);
    });
});
