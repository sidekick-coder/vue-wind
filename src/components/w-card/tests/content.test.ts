import { mount, MountOptions } from '@vue/test-utils';
import { expect } from 'chai';
import faker from 'faker';

import WCardContent from '../content';

describe('w-card-content (unit)', () => {
    const component = (data?: MountOptions<InstanceType<typeof WCardContent>>) => mount(WCardContent, data);
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
