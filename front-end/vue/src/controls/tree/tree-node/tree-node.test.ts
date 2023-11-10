import { shallowMount } from '@vue/test-utils';
import { type TreeNode as TreeNodeType } from '../tree.interface';
import TreeNode from './tree-node.vue';

describe('TreeNode', () => {
  it('should render a checkbox when the "showCheckbox" prop is true', () => {
    const items: TreeNodeType[] = [
      {
        id: '1',
        name: 'Item 1',
        children: []
      }
    ];
    const wrapper = shallowMount(TreeNode, {
      propsData: {
        items,
        showCheckbox: true
      }
    });
    const vm: any = wrapper.vm;
    expect(vm.$props.showCheckbox).toBe(true);
    expect(wrapper.findAll('.node-checkbox')).toHaveLength(1);
  });

  it('should not render a checkbox when the "showCheckbox" prop is false', () => {
    const items: TreeNodeType[] = [
      {
        id: '1',
        name: 'Item 1',
        children: []
      }
    ];
    const wrapper = shallowMount(TreeNode, {
      propsData: {
        items,
        showCheckbox: false
      }
    });
    const vm: any = wrapper.vm;
    expect(vm.$props.showCheckbox).toBe(false);
    expect(wrapper.findAll('.node-checkbox')).toHaveLength(0);
  });
});
