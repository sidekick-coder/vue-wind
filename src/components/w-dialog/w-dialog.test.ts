import sinon from 'sinon';
import faker from 'faker';
import { expect } from 'chai';

import { mount, MountOptions } from '@vue/test-utils';

import WDialog from './w-dialog.vue';
import WTransitionFadeIn from './../w-transition/fade-in.vue';

describe('w-dialog (unit)', () => {
    const component = (data?: MountOptions<InstanceType<typeof WDialog>>) => mount(WDialog, data);

    it('should render default slot in content of dialog', () => {
        const wrapper = component({
            propsData: { value: true },
            slots: {
                default: 'Hello word'
            }
        });

        expect(wrapper.html()).to.contain('Hello word');
    });
    it('should have WTransitionFadeIn component for animation', () => {
        const wrapper = component();

        expect(wrapper.findComponent(WTransitionFadeIn).exists()).to.be.equal(true);
    });
    it('should component have classes of dialogClass prop', () => {
        const dialogClass = [
            faker.lorem.word(),
            faker.lorem.word(),
            faker.lorem.word()
        ];
        const wrapper = component({
            propsData: {
                value: true,
                dialogClass
            }
        });

        const allClasses = dialogClass.concat(['w-dialog']);

        expect(wrapper.find('.w-dialog').classes()).to.have.members(allClasses);
    });
    it('should overlay element have classes of overlayClass prop', () => {
        const overlayClass = [
            faker.lorem.word(),
            faker.lorem.word(),
            faker.lorem.word()
        ];
        const wrapper = component({
            propsData: {
                value: true,
                overlayClass
            }
        });

        const allClasses = overlayClass.concat(['w-dialog-overlay']);

        expect(wrapper.find('.w-dialog-overlay').classes()).to.have.members(allClasses);
    });

    it('should content element have classes of contentClass prop', () => {
        const contentClass = [
            faker.lorem.word(),
            faker.lorem.word(),
            faker.lorem.word()
        ];

        const wrapper = component({
            propsData: {
                value: true,
                contentClass
            }
        });

        const allClasses = contentClass.concat(['w-dialog-content']);

        allClasses.forEach(className => {
            expect(wrapper.find('.w-dialog-content').classes()).to.include(className);
        });
    });

    it('should content element have class of with when prop seted', () => {
        const width = faker.random.number({ min: 1, max: 15 }).toString();

        const wrapper = component({
            propsData: {
                value: true,
                width
            }
        });

        expect(wrapper.find('.w-dialog-content').classes()).to.include(`w-${width}`);
    });
    it('should content element have class of maxWith when prop is seted', () => {
        const maxWidth = faker.random.number({ min: 1, max: 15 }).toString();

        const wrapper = component({
            propsData: {
                value: true,
                maxWidth
            }
        });

        expect(wrapper.find('.w-dialog-content').classes()).to.include(`max-w-${maxWidth}`);
    });

    it('should emit event input with false value to hide component when click in overlay', async () => {
        const maxWidth = faker.random.number({ min: 1, max: 15 }).toString();

        const input = sinon.stub();

        const wrapper = component({
            propsData: {
                value: true,
                maxWidth
            },
            listeners: { input }
        });

        await wrapper.find('.w-dialog-overlay').trigger('click');

        sinon.assert.calledOnceWithExactly(input, false);
    });
});
