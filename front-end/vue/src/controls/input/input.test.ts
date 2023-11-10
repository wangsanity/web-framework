import { shallowMount } from '@vue/test-utils';
import Input from './input.vue';

describe('Input', () => {
  it('should emit an "update:modelValue" event with the input value when the input value changes', () => {
    const wrapper = shallowMount(Input);
    const vm: any = wrapper.vm;
    const event = { target: { value: 'test' } };
    vm.onInputChange(event);
    expect(wrapper.emitted('update:modelValue')).toBeTruthy();
    expect((wrapper.emitted('update:modelValue') as Array<string[]>)[0]).toEqual(['test']);
  });

  it('should emit a "changeEvent" event with the event object when the input value changes', () => {
    const wrapper = shallowMount(Input);
    const vm: any = wrapper.vm;
    const event = { target: { value: 'test' } };
    vm.onInputChange(event);
    expect(wrapper.emitted('changeEvent')).toBeTruthy();
    expect((wrapper.emitted('changeEvent') as Array<string[]>)[0]).toEqual([event]);
  });
});