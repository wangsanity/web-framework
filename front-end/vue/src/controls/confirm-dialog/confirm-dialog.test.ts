import { mount } from '@vue/test-utils';
import ConfirmDialog from './confirm-dialog.vue';

describe('ConfirmDialog', () => {
  it('should not render when the "visible" prop is false', () => {
    const wrapper = mount(ConfirmDialog);
    const vm: any = wrapper.vm;
    expect(vm.$props.visible).toBe(false);
    expect(wrapper.html()).toEqual('<!--v-if-->');
  });

  it('should render when the "visible" prop is true', () => {
    const wrapper = mount(ConfirmDialog, {
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
