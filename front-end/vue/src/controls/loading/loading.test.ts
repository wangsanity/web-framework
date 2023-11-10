import { shallowMount } from '@vue/test-utils';
import Loading from './loading.vue';

describe('Loading', () => {
  it('should render with a fixed position by default', () => {
    const wrapper = shallowMount(Loading);
    const vm: any = wrapper.vm;
    expect(vm.$props.absolute).toBe(false);
  });

  it('should render with an absolute position when the "absolute" prop is set to true', () => {
    const wrapper = shallowMount(Loading, {
      propsData: {
        absolute: true,
      },
    });
    const vm: any = wrapper.vm;
    expect(vm.$props.absolute).toBe(true);
    expect(wrapper.classes()).toContain('position-absolute');
  });
});