import { shallowMount } from '@vue/test-utils';
import Button from './button.vue';

describe('Button', () => {
  it('should emit a "clickEvent" event when the button is clicked and is not disabled or loading', () => {
    const wrapper = shallowMount(Button);
    const vm: any = wrapper.vm;
    vm.onClick();
    expect(wrapper.emitted('clickEvent')).toBeTruthy();
  });

  it('should not emit a "clickEvent" event when the button is disabled', () => {
    const wrapper = shallowMount(Button, {
      propsData: {
        disabled: true
      }
    });
    const vm: any = wrapper.vm;
    vm.onClick();
    expect(wrapper.emitted('clickEvent')).toBeFalsy();
  });

  it('should not emit a "clickEvent" event when the button is loading', () => {
    const wrapper = shallowMount(Button, {
      propsData: {
        isLoading: true
      }
    });
    const vm: any = wrapper.vm;
    vm.onClick();
    expect(wrapper.emitted('clickEvent')).toBeFalsy();
  });
});
