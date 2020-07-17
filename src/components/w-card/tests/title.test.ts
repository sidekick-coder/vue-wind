import { mount, MountOptions } from '@vue/test-utils';
import { expect } from 'chai';
import faker from 'faker';

import WCardTitle from '../title';

describe('w-card-title (unit)', () => {
    const component = (data?: MountOptions<InstanceType<typeof WCardTitle>>) => mount(WCardTitle, data);
    it('should use classes of defaultClass prop', () => {
        const classes = faker.random.words(5).split(' ');
        const wrapper = component({
            propsData: {
                defaultClass: classes
            }
        });

        expect(wrapper.classes()).to.be.eql(classes);
    });
});
