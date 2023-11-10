import { shallowMount } from '@vue/test-utils';
import Popup from './popup.vue';

describe('Popup', () => {
  it('should render without crashing', () => {
    shallowMount(Popup, {
      propsData: {
        position: 'top-left',
      },
    });
  });
});