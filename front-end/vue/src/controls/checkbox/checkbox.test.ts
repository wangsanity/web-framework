import { shallowMount } from '@vue/test-utils';
import Checkbox from './checkbox.vue';

describe('Checkbox', () => {
  it('should emit an "update:modelValue" event with the checked value when clicked', () => {
    const wrapper = shallowMount(Checkbox);
    const vm: any = wrapper.vm;
    const event = { target: { checked: true } };
    vm.onClick(event);
    expect(wrapper.emitted('update:modelValue')).toBeTruthy();
    expect((wrapper.emitted('update:modelValue') as Array<string[]>)[0]).toEqual([true]);
  });

  it('should emit a "changeEvent" event with the event object when clicked', () => {
    const wrapper = shallowMount(Checkbox);
    const vm: any = wrapper.vm;
    const event = { target: { checked: true } };
    vm.onClick(event);
    expect(wrapper.emitted('changeEvent')).toBeTruthy();
    expect((wrapper.emitted('changeEvent') as Array<string[]>)[0]).toEqual([event]);
  });
});