import { mount, MountOptions } from '@vue/test-utils';
import { expect } from 'chai';
import faker from 'faker';

import WDataTable from './index.vue';

export interface Computed {
    valuesNames: string;
}

interface Item {
    title?: string;
    value: string;
}
describe('w-data-table (unit)', () => {
    const component = (data?: MountOptions<InstanceType<typeof WDataTable>>) => mount(WDataTable, data);

    const givenTableHeaders = (qtn = 5, data?: object) => {
        const headers = [];
        for (let i = 0; i < qtn; i++) {
            headers.push({
                name: faker.name.title(),
                value: faker.random.word(),
                class: undefined,
                ...data
            });
        }
        return headers;
    };

    const givenTableItems = (qtn = 5, data?: object) => {
        const items = [];
        for (let i = 0; i < qtn; i++) {
            items.push({
                title: faker.random.word(),
                value: faker.random.word(),
                ...data
            });
        }
        return items;
    };

    describe('template', () => {
        it.only('should render a <th> for each item of prop headers', async () => {
            const headers = givenTableHeaders();

            const wrapper = component({
                propsData: { headers }
            });

            const html = wrapper.html();

            headers.forEach(header => {
                expect(html).to.contains(`<th class="px-5 py-3 text-left">${header.name}</th>`);
            });
        });

        it.only('should each header <th> item contain classes of headerItemsDefaultClasses prop', () => {
            const headers = givenTableHeaders();

            const randomClass = faker.internet.domainWord();

            const wrapper = component({
                propsData: {
                    headers,
                    headerItemsDefaultClasses: randomClass
                }
            });

            const html = wrapper.html();

            headers.forEach(header => {
                expect(html).to.contains(`<th class="${randomClass}">${header.name}</th>`);
            });
        });
        it.only('should render header <th> item with extra class in item object prop', () => {
            const headers = givenTableHeaders(5, {
                class: faker.random.word()
            });

            const randomClass = faker.internet.domainWord();

            const wrapper = component({
                propsData: {
                    headers,
                    headerItemsDefaultClasses: randomClass
                }
            });

            const html = wrapper.html();

            headers.forEach(header => {
                expect(html).to.contains(`<th class="${randomClass} ${header.class}">${header.name}</th>`);
            });
        });
        it.only('should render <td> empty-items message in <tbody> if items props length is 0', () => {
            const wrapper = component();

            expect(wrapper.html()).to.contains('<td colspan="1" class="px-5 py-3 text-center">No items</td>');
        });
        it.only('should render <td> empty-items-slot in <tbody> if items props length is 0', () => {
            const randomText = faker.lorem.words(3);

            const wrapper = component({
                slots: {
                    'empty-items': randomText
                }
            });

            expect(wrapper.html()).to.contains(`<td colspan="1" class="px-5 py-3 text-center">${randomText}</td>`);
        });
        it.only('should <td> empty-items-slot contain classes of itemsThDefaultClasses prop', () => {
            const randomClass = faker.internet.domainWord();

            const wrapper = component({
                propsData: {
                    itemsTdDefaultClasses: randomClass
                }
            });

            expect(wrapper.html()).to.contains(`<td colspan="1" class="${randomClass} text-center">No items</td>`);
        });
        it.only('should render a <td> in <tbody> for each item of prop items', () => {
            const items = givenTableItems();

            const wrapper = component({
                propsData: {
                    headers: [{ value: 'value', name: 'Value' }],
                    items
                }
            });

            const html = wrapper.html();

            items.forEach(item => {
                expect(html).to.contains(`<td class="px-5 py-3">${item.value}</td>`);
            });
        });
        it.only('should each item <td> rendered contain classes of itemsTdDefaultClasses prop', () => {
            const items = givenTableItems();
            const randomClass = faker.internet.domainWord();

            const wrapper = component({
                propsData: {
                    headers: [{ value: 'value', name: 'Value' }],
                    items,
                    itemsTdDefaultClasses: randomClass
                }
            });

            const html = wrapper.html();

            items.forEach(item => {
                expect(html).to.contains(`<td class="${randomClass}">${item.value}</td>`);
            });
        });
        it.only('should use item.{headerValue} slot for the items if is defined', () => {
            const items = givenTableItems(5);
            const randomWord = faker.internet.domainWord();

            const wrapper = component({
                propsData: {
                    headers: [
                        { name: 'Title', value: 'title' },
                        { name: 'Value', value: 'value' }
                    ],
                    items
                },
                scopedSlots: {
                    'item.title': ({ item }: { item: Item }) => `${randomWord}-${item.title}`,
                    'item.value': ({ item }: { item: Item }) => `${randomWord}-${item.value}`
                }
            });

            const html = wrapper.html();

            items.forEach(item => {
                expect(html).to.contains(`<td class="px-5 py-3">${randomWord}-${item.title}</td>`);
                expect(html).to.contains(`<td class="px-5 py-3">${randomWord}-${item.value}</td>`);
            });
        });
    });
    describe('computed', () => {
        it.only('should valuesNames return an array of strings in headers prop values', () => {
            const headers = givenTableHeaders();

            const wrapper = component({
                propsData: { headers }
            });

            expect((wrapper.vm as any).valuesNames).to.be.eql(headers.map(header => header.value));
        });
    });
});
