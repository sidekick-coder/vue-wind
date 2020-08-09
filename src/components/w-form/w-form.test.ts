import sinon from 'sinon';
import { expect } from 'chai';
import { mount, MountOptions, createLocalVue } from '@vue/test-utils';

import WForm from './w-form.vue';
import WInput from '../w-input';
import WTextField from '../w-text-field';
import WTextarea from '../w-textarea';

describe('w-form (unit)', () => {
    const component = (data?: MountOptions<InstanceType<typeof WForm>>) => {
        const localVue = createLocalVue();
        localVue.component('WInput', WInput);
        localVue.component('WTextField', WTextField);
        localVue.component('WTextarea', WTextarea);
        return mount(WForm, { ...data, localVue });
    };

    afterEach(() => {
        sinon.reset();
        sinon.restore();
    });

    it('should get all child w-input components and set inputs property', async () => {
        const components = ['w-input', 'w-text-field', 'w-input', 'w-textarea'];

        const wrapper = component({
            slots: {
                default: components.map(c => `<${c} />`).join('')
            }
        });
        expect(wrapper.vm.$data.inputs.length).to.be.equal(components.length);
    });
    it('should validate() method call all child input validate() method', async () => {
        const wrapper = component({
            slots: {
                default: `
                    <w-input />
                `
            }
        });
        const input = wrapper.findComponent(WInput);

        const spy = sinon.spy((input.vm as any), 'validate');

        (wrapper.vm as any).validate();

        sinon.assert.calledOnce(spy);

        wrapper.destroy();
        input.destroy();
    });
    it('should validate() return true if inputs are valid', async () => {
        const wrapper = component({
            slots: {
                default: `
                    <w-input />
                `
            }
        });

        const valid = (wrapper.vm as any).validate();

        expect(valid).to.be.equal(true);
    });
    it('should validate() return false if inputs are invalid', async () => {
        const wrapper = component({
            slots: {
                default: `
                    <w-input :rules="[() => true]" />
                    <w-textarea :rules="[() => 'error']" />
                    <w-text-field />
                `
            }
        });

        const valid = (wrapper.vm as any).validate();

        expect(valid).to.be.equal(false);
    });
    it('should remove components in inputs property before destroy component', async () => {
        const data = {
            inputs: []
        };

        component({
            data: () => data,
            slots: {
                default: `
                    <w-input />
                    <w-text-field />
                    <w-textarea />
                    <w-input />
                `
            }
        }).destroy();

        expect(data.inputs.length).to.be.equal(0);
    });
});
