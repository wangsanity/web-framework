import { shallowMount } from '@vue/test-utils';
import Dialog from './dialog.vue';

describe('Dialog', () => {
  it('should not render when the "visible" prop is false', () => {
    const wrapper = shallowMount(Dialog);
    const vm: any = wrapper.vm;
    expect(vm.$props.visible).toBe(false);
    expect(wrapper.html()).toEqual('<!--v-if-->');
  });

  it('should render when the "visible" prop is true', () => {
    const wrapper = shallowMount(Dialog, {
      propsData: {
        visible: true
      },
      slots: {
        default: '<div>Dialog content</div>'
      }
    });
    const vm: any = wrapper.vm;
    expect(vm.$props.visible).toBe(true);
    expect(wrapper.html()).toContain('Dialog content');
  });
});
