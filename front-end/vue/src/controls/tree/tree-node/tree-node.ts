import { type TreeNode } from '../tree.interface';
import { setCheckStatus } from '../tree-helper';
import { defineComponent } from 'vue';

export default defineComponent({
  props: {
    items: {
      default: [] as TreeNode[]
    },
    showCheckbox: {
      default: false
    },
    theme: {
      default: 'black'
    }
  },
  methods: {
    onSelectItem(menu: TreeNode): void {
      this.$emit('selectItem', menu);
    },
    onExpand(menu: TreeNode, expanded: boolean) {
      menu.expanded = expanded;
    },
    onCheckItem(item: TreeNode) {
      item.checked = !item.checked;
      setCheckStatus(item.children, item.checked);
    }
  }
});
