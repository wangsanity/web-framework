import { mount } from '@vue/test-utils';
import Toolbar from './toolbar.vue';

describe('Toolbar', () => {
  it('should render the correct buttons when the "buttons" prop is set', () => {
    const buttons = {
      new: true,
      settings: false,
      chart: true,
    };
    const wrapper = mount(Toolbar, {
      propsData: {
        buttons,
      },
    });
    const vm: any = wrapper.vm;
    expect(vm.$props.buttons).toEqual(buttons);
    expect(wrapper.findAll('.button-box')).toHaveLength(2);
  });

  it('should render default buttons when the "buttons" prop is not set', () => {
    const wrapper = mount(Toolbar);
    const vm: any = wrapper.vm;
    expect(vm.$props.buttons).toEqual({
      new: true,
      settings: false,
      chart: false,
    });
    expect(wrapper.findAll('.button-box')).toHaveLength(1);
  });
});