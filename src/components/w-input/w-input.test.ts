import faker from 'faker';
import sinon from 'sinon';

import { mount, MountOptions } from '@vue/test-utils';
import { expect } from 'chai';

import WInput from './w-input.vue';
import WTransition from '../w-transition/slide-down.vue';

describe('w-input (unit)', () => {
    const component = (data?: MountOptions<InstanceType<typeof WInput>>) => mount(WInput, data);

    describe('template', () => {
        it('should have label element if prop label is passed', () => {
            const label = faker.random.word();

            const wrapper = component({
                propsData: { label }
            });

            expect(wrapper.find('label').text()).to.be.includes(label);
        });

        it('should have input element', () => {
            const wrapper = component({
                stubs: { WInput: true }
            });

            expect(wrapper.find('input').exists()).to.be.equal(true);
        });

        it('should bind v-model in input element', async () => {
            const randomValue = faker.lorem.words(5);
            const wrapper = mount({
                data () {
                    return { model: '' };
                },
                components: { WInput },
                template: `
            <div>
                <w-input v-model='model' />
            </div>`
            });

            wrapper.find('input').setValue(randomValue);

            await wrapper.vm.$nextTick();

            expect(wrapper.html()).to.includes(`value="${randomValue}"`);
        });

        it('should when parent change v-model value the input element value also changes', async () => {
            const data = {
                model: ''
            };
            const randomValue = faker.lorem.words(5);

            const wrapper = mount({
                data () {
                    return data;
                },
                components: { WInput },
                template: `
            <div>
                <w-input v-model='model' />
            </div>`
            });

            data.model = randomValue;

            await wrapper.vm.$nextTick();

            expect(wrapper.html()).to.includes(`value="${randomValue}"`);
        });

        it('should when input element value changes emit event "update:value" with new value', async () => {
            const randomValue = faker.lorem.words(5);
            const wrapper = component();

            wrapper.find('input').setValue(randomValue);

            await wrapper.vm.$nextTick();

            const emitted = wrapper.emitted('update:value') || [];

            expect(emitted[0]).to.includes(randomValue);
        });

        it('should have w-transition-slide-down component', () => {
            const wrapper = component({
                stubs: {
                    'w-transition-slide-down': true
                }
            });

            expect(wrapper.findComponent(WTransition).exists()).to.be.equal(true);
        });

        it('should show error message if is defined', () => {
            const randomMessage = faker.lorem.words(5);

            const wrapper = component({
                data: function () {
                    return { errorMessage: randomMessage };
                }
            });

            expect(wrapper.html()).to.includes(`<div class="my-2 text-red-500 text-xs">${randomMessage}</div>`);
        });
    });

    describe('props', () => {
        it('should create a element with the name in component data', () => {
            const wrapper = component({
                data () {
                    return {
                        component: 'textarea'
                    };
                }
            });

            expect(wrapper.find('textarea').exists()).to.be.equal(true);
        });

        it('should label have classes in defaultLabelClass', () => {
            const randomClass = faker.lorem.words(5);

            const wrapper = component({
                propsData: {
                    label: faker.random.word(),
                    defaultLabelClass: randomClass
                }
            });

            const label = wrapper.find('label');

            expect(label.attributes('class')).to.includes(randomClass);
        });

        it('should input have classes in defaultInputClass', () => {
            const randomClass = faker.lorem.words(5);

            const wrapper = component({
                propsData: {
                    label: faker.random.word(),
                    defaultInputClass: randomClass
                }
            });

            const input = wrapper.find('input');

            expect(input.attributes('class')).to.includes(randomClass);
        });

        it('should input have border color class of color prop', () => {
            const randomColor = faker.random.arrayElement(['teal', 'blue', 'red']);

            const wrapper = component({
                propsData: {
                    label: faker.random.word(),
                    color: randomColor
                }
            });

            const input = wrapper.find('input');

            expect(input.attributes('class')).to.includes(`border-${randomColor}`);
        });

        it('should input have text color class of textColor prop', () => {
            const randomColor = faker.random.arrayElement(['teal', 'blue', 'red']);

            const wrapper = component({
                propsData: {
                    label: faker.random.word(),
                    textColor: randomColor
                }
            });

            const input = wrapper.find('input');

            expect(input.attributes('class')).to.includes(`text-${randomColor}`);
        });

        it('should input have focus border color class of focus:color prop', () => {
            const randomColor = faker.random.arrayElement(['teal', 'blue', 'red']);

            const wrapper = component({
                propsData: {
                    label: faker.random.word(),
                    'focus:color': randomColor
                }
            });

            const input = wrapper.find('input');

            expect(input.attributes('class')).to.includes(`focus:border-${randomColor}`);
        });

        it('should input have focus text color class of focus:textColor prop', () => {
            const randomColor = faker.random.arrayElement(['teal', 'blue', 'red']);

            const wrapper = component({
                propsData: {
                    label: faker.random.word(),
                    'focus:textColor': randomColor
                }
            });

            const input = wrapper.find('input');

            expect(input.attributes('class')).to.includes(`focus:text-${randomColor}`);
        });

        it('should call all functions in rules props when v-model changes', async () => {
            const randomValue = faker.random.words(5);
            const rules = [
                sinon.stub(),
                sinon.stub(),
                sinon.stub(),
                sinon.stub()
            ];

            const wrapper = mount({
                data: () => ({ model: '', rules }),
                components: { WInput },
                template: `
                    <div>
                        <w-input v-model='model' :rules='rules'  />
                    </div>
                `
            });

            wrapper.find('input').setValue(randomValue);

            await wrapper.vm.$nextTick();

            rules.forEach(rule => {
                sinon.assert.calledOnceWithExactly(rule, randomValue);
            });
        });
    });

    describe('computed', () => {
        it('should inputModel be the same as v-model value', () => {
            const randomValue = faker.random.words(5);

            const wrapper = component({
                propsData: { value: randomValue }
            });

            expect((wrapper.vm as any).inputModel).to.be.equal(randomValue);
        });
        it('should when set inputModel call validate() method', async () => {
            const wrapper = component({
                propsData: { value: '' }
            });
            const validateSpy = sinon.spy((wrapper.vm as any), 'validate');

            wrapper.setProps({ value: faker.random.words(5) });

            await wrapper.vm.$nextTick();

            sinon.assert.calledOnce(validateSpy);
        });
        it('should when set inputModel emit event "update:value"', async () => {
            const randomValue = faker.random.words(5);
            const wrapper = component({
                propsData: { value: randomValue }
            });

            wrapper.find('input').trigger('input');

            await wrapper.vm.$nextTick();

            const emitted = wrapper.emitted('update:value') || [];

            expect(emitted[0]).to.includes(randomValue);
        });
        it('should inputClasses have classes of props defaultInputClass and colors classes', () => {
            const defaultInputClass = faker.random.words(5);
            const color = faker.random.arrayElement(['teal', 'blue', 'red']);
            const focusColor = faker.random.arrayElement(['teal', 'blue', 'red']);

            const wrapper = component({
                propsData: { defaultInputClass, color, 'focus:color': focusColor }
            });

            expect((wrapper.vm as any).inputClasses)
                .to.includes(defaultInputClass)
                .and.includes(`border-${color}`)
                .and.includes(`focus:border-${focusColor}`);
        });

        it('should inputClasses have error classes when errorMessage is not null', () => {
            const errorColor = faker.random.arrayElement(['red-500', 'red-600', 'red-700']);
            const wrapper = component({
                propsData: { 'error:color': errorColor },
                data: function () {
                    return { errorMessage: faker.random.words() };
                }
            });

            expect((wrapper.vm as any).inputClasses)
                .to.includes(`border-${errorColor}`)
                .and.includes(`text-${errorColor}`);
        });

        it('should labelClasses have same classes in defaultLabelClasses and color', () => {
            const defaultLabelClass = faker.random.words(5);
            const color = faker.random.arrayElement(['teal', 'blue', 'red']);
            const focusColor = faker.random.arrayElement(['teal', 'blue', 'red']);
            const wrapper = component({
                propsData: {
                    defaultLabelClass, color, 'focus:color': focusColor
                }
            });

            expect((wrapper.vm as any).labelClasses)
                .to.includes(defaultLabelClass)
                .and.includes(`text-${color}`);
        });

        it('should labelClasses have error classes when errorMessage is not null', () => {
            const errorColor = faker.random.arrayElement(['red-500', 'red-600', 'red-700']);
            const wrapper = component({
                propsData: { 'error:color': errorColor },
                data: function () {
                    return { errorMessage: faker.random.words() };
                }
            });

            expect((wrapper.vm as any).labelClasses).to.includes(`text-${errorColor}`);
        });
    });

    describe('method', () => {
        it('should return true if pass in rules', () => {
            const randomValue = faker.random.words(5);
            const rules = [() => true];

            const wrapper = component({
                propsData: {
                    value: randomValue,
                    rules
                }
            });

            const valid = (wrapper.vm as any).validate();

            expect(valid).to.be.equal(true);
        });
        it('should validate() method return false if not pass in rules', () => {
            const randomMessage = faker.random.words(5);
            const rules = [() => true, () => randomMessage];

            const wrapper = component({
                propsData: {
                    rules
                }
            });

            const valid = (wrapper.vm as any).validate();

            expect(valid).to.be.equal(false);
        });
        it('should validate() method set errorMessage if not pass in rules', () => {
            const randomMessage = faker.random.words(5);
            const rules = [() => true, () => randomMessage];

            const wrapper = component({
                propsData: {
                    rules
                }
            });

            (wrapper.vm as any).validate();
            expect(wrapper.vm.$data.errorMessage).to.be.equal(randomMessage);
        });
    });
});
