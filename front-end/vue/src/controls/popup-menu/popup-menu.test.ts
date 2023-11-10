import { shallowMount } from '@vue/test-utils';
import PopupMenu from './popup-menu.vue';

describe('PopupMenu', () => {
  it('should render without crashing', () => {
    const items = [
      { name: 'Item 1', url: '/item1' },
      { name: 'Item 2', url: '/item2' },
      { name: 'Item 3', url: '/item3' },
    ];
    shallowMount(PopupMenu, {
      propsData: {
        items,
      },
    });
  });
});