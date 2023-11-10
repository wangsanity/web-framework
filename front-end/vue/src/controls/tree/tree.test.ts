import { mount } from '@vue/test-utils';
import { type TreeNode } from './tree.interface';
import Tree from './tree.vue';
import TreeNodeComponent from './tree-node/tree-node.vue';

describe('Tree', () => {
  it('should render the correct number of tree nodes when the "items" prop is set', () => {
    const items: TreeNode[] = [
      {
        id: '1',
        name: 'Item 1',
        children: [
          {
            id: '2',
            name: 'Item 1.1',
            children: []
          },
          {
            id: '3',
            name: 'Item 1.2',
            children: []
          }
        ]
      },
      {
        id: '4',
        name: 'Item 2',
        children: []
      }
    ];
    const wrapper = mount(Tree, {
      propsData: {
        items
      },
      global: {
        components: {
          'tree-node': TreeNodeComponent
        }
      }
    });
    const vm: any = wrapper.vm;
    expect(vm.$props.items).toEqual(items);
    expect(wrapper.findAll('.ctr-tree-node')).toHaveLength(4);
  });

  it('should not render any tree nodes when the "items" prop is not set', () => {
    const wrapper = mount(Tree, {
      global: {
        components: {
          'tree-node': TreeNodeComponent
        }
      }
    });
    const vm: any = wrapper.vm;
    expect(vm.$props.items).toEqual([]);
    expect(wrapper.findAll('.ctr-tree-node')).toHaveLength(0);
  });
});
