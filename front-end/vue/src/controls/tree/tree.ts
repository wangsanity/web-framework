import { type TreeNode } from './tree.interface';
import { setCheckStatus, deselectItems } from './tree-helper';
import { defineComponent } from 'vue';
import ComTreeNode from './tree-node/tree-node.vue';

export default defineComponent({
  components: { ComTreeNode },
  props: {
    items: {
      default: []
    },
    showCheckbox: {
      default: false
    },
    theme: {
      default: 'black'
    }
  },
  data() {
    return {
      selectedItem: null as TreeNode | null
    };
  },
  methods: {
    onSelectItem(menu: TreeNode): void {
      if (this.showCheckbox) {
        menu.checked = !menu.checked;
      } else {
        deselectItems((this.$props as any).items || []);
        menu.selected = true;
      }
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
