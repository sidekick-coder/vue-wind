import { mount, MountOptions } from '@vue/test-utils';
import { expect } from 'chai';

import WBtn from './w-btn';
import faker from 'faker';

describe('w-btn (unit)', () => {
    const component = (data?: MountOptions<InstanceType<typeof WBtn>>) => mount(WBtn, {
        stubs: {
            'w-icon': true
        },
        ...data
    });

    it('should set button background color with prop color', () => {
        const wrapper = component({
            propsData: {
                color: 'red-500'
            }
        });
        expect(wrapper.classes()).to.include('bg-red-500');
    });

    it('should when text prop is true add text-color class to button', () => {
        const wrapper = component({
            propsData: {
                color: 'red-500',
                text: true
            }
        });
        expect(wrapper.classes()).to.include('text-red-500').and.not.include('bg-red-500');
    });

    it('should add block and w-full class to button when block prop is true', () => {
        const wrapper = component({
            propsData: {
                block: true
            }
        });
        expect(wrapper.classes()).to.include('block').and.include('w-full');
    });

    it('should add rounded class to button when rounded prop is true', () => {
        const wrapper = component({
            propsData: {
                rounded: true
            }
        });
        expect(wrapper.classes()).to.include('rounded');
    });

    it('should have spin icon element for loading', () => {
        const wrapper = component();
        const icon = wrapper.find('.w-btn-loader');
        expect(icon.exists()).to.be.equal(true);
    });

    it('should spin icon have size value of prop spinSize', () => {
        const wrapper = component({
            propsData: {
                spinSize: '2rem'
            }
        });
        const icon = wrapper.find('.w-btn-loader');

        expect(icon.html()).to.include('--size: 2rem');
    });

    it('should spin icon have speed value of prop spinSeep', () => {
        const wrapper = component({
            propsData: {
                spinSeep: '3s'
            }
        });
        const icon = wrapper.find('.w-btn-loader');

        expect(icon.html()).to.include('--speed: 3s');
    });

    it('should spin icon have hidden class if prop loading is false', () => {
        const wrapper = component({
            propsData: {
                loading: false
            }
        });
        const icon = wrapper.find('.w-btn-loader');

        expect(icon.classes()).to.include('hidden');
    });

    it('should have span text element with button content', () => {
        const randomWord = faker.random.word();

        const wrapper = mount({
            components: {
                WBtn: WBtn,
                WIcon: {
                    template: '<i><slot /></i>'
                }
            },
            template: `<div><w-btn>${randomWord}</w-btn></div>`
        });

        const span = wrapper.find('span');

        expect(span.html()).to.include(randomWord);
    });

    it('should span text element have class opacity-0 when prop loading is true', () => {
        const wrapper = component({
            propsData: {
                loading: true
            }
        });

        const span = wrapper.find('span');

        expect(span.classes()).to.include('opacity-0');
    });

    it('should button have all classes of defaultClass prop', () => {
        const randomWords = faker.random.words(5).split(' ');
        const wrapper = component({
            propsData: {
                defaultClass: randomWords
            }
        });

        expect(wrapper.classes()).to.be.eql(randomWords);
    });
});
