import { mount, MountOptions } from '@vue/test-utils';
import { expect } from 'chai';
import faker from 'faker';

import WIcon from './w-icon';

describe('w-icon (unit)', () => {
    const component = (data?: MountOptions<InstanceType<typeof WIcon>>) => mount(WIcon, data);

    it('should render component with the name in plugin options', () => {
        const iconComponent = faker.name.firstName().toLowerCase();
        const wrapper = component({
            stubs: {
                [iconComponent]: {
                    template: `<div id="${iconComponent}"><slot /></div>`
                }
            },
            mocks: {
                $vuewind: {
                    options: {
                        iconComponent: iconComponent
                    }
                }
            }
        });

        expect(wrapper.find(`#${iconComponent}`).exists()).to.be.equal(true);
    });

    it('should render an normal <i> element with the conetn if vanilla prop is true', () => {
        const wrapper = component({
            propsData: {
                vanilla: true
            },
            mocks: {
                $vuewind: {
                    options: {
                        iconComponent: 'span'
                    }
                }
            }
        });

        expect(wrapper.find('i').exists()).to.be.equal(true);
    });
});
