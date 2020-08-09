import { mount, MountOptions } from '@vue/test-utils';
import { expect } from 'chai';
import faker from 'faker';

import WTextarea from './w-textarea';

describe('w-textarea (unit)', () => {
    const component = (data?: MountOptions<InstanceType<typeof WTextarea>>) => mount(WTextarea, data);

    it('should have textarea element', () => {
        const wrapper = component({
            stubs: { WInput: true }
        });

        expect(wrapper.find('textarea').exists()).to.be.equal(true);
    });

    it('should ignore component prop', () => {
        const wrapper = component({
            propsData: { component: 'input' }
        });

        expect(wrapper.find('textarea').exists()).to.be.equal(true);
    });

    it('should bind props in w-input component', () => {
        const randomClass = faker.lorem.words(5);

        const wrapper = component({
            propsData: { defaultInputClass: randomClass }
        });

        expect(wrapper.find('textarea').attributes('class')).to.includes(randomClass);
    });

    it('should bind v-model value in input', async () => {
        const randomValue = faker.lorem.words(5);
        const wrapper = mount({
            data () {
                return { model: '' };
            },
            components: { WTextarea },
            template: `
            <div>
                <w-textarea v-model='model' />
            </div>`
        });

        wrapper.find('textarea').setValue(randomValue);

        await wrapper.vm.$nextTick();

        expect(wrapper.html()).to.includes(`value="${randomValue}"`);
    });
});
