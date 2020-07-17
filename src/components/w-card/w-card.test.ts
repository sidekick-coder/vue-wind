import { mount, MountOptions } from '@vue/test-utils';
import { expect } from 'chai';

import WCard from './w-card';

describe('w-card (unit)', () => {
    const component = (data?: MountOptions<InstanceType<typeof WCard>>) => mount(WCard, data);

    it('should add background color class if prop color is defined', () => {
        const wrapper = component({
            propsData: {
                color: 'purple-500'
            }
        });

        expect(wrapper.classes()).to.include('bg-purple-500');
    });

    it('should add rounded class if prop rounded is true', () => {
        const wrapper = component({
            propsData: {
                rounded: true
            }
        });

        expect(wrapper.classes()).to.include('rounded');
    });

    it('should add border class if prop border is true', () => {
        const wrapper = component({
            propsData: {
                border: true
            }
        });

        expect(wrapper.classes()).to.include('border');
    });

    it('should add border color class if prop border and borderColor is defined', () => {
        const wrapper = component({
            propsData: {
                border: true,
                borderColor: 'purple-500'
            }
        });

        expect(wrapper.classes()).to.include('border-purple-500');
    });

    it('should add border style class if prop border and borderStyle is defined', () => {
        const wrapper = component({
            propsData: {
                border: true,
                borderStyle: 'dashed'
            }
        });

        expect(wrapper.classes()).to.include('border-dashed');
    });

    it('should add max-width class if prop maxWidth is defined', () => {
        const wrapper = component({
            propsData: {
                maxWidth: 'lg'
            }
        });

        expect(wrapper.classes()).to.include('max-w-lg');
    });

    it('should add max-width style if prop maxWidth is defined and is in px', () => {
        const wrapper = component({
            propsData: {
                maxWidth: '300px'
            }
        });

        expect(wrapper.html()).to.include('max-width: 300px');
    });

    it('should add min-height style if prop minHeight is defined', () => {
        const wrapper = component({
            propsData: {
                minHeight: '300px'
            }
        });

        expect(wrapper.html()).to.include('min-height: 300px');
    });

    it('should add height style if prop height is defined', () => {
        const wrapper = component({
            propsData: {
                height: '300px'
            }
        });

        expect(wrapper.html()).to.include('height: 300px');
    });

    it('should add shadow class if prop shadow is true', () => {
        const wrapper = component({
            propsData: {
                shadow: true
            }
        });

        expect(wrapper.classes()).to.include('shadow');
    });

    it('should add shadow class with value if prop shadow is a string', () => {
        const wrapper = component({
            propsData: {
                shadow: 'lg'
            }
        });

        expect(wrapper.classes()).to.include('shadow-lg');
    });
});
