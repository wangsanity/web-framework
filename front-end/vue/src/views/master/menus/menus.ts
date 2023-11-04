import { CtrTree, type TreeNode, deselectItems, checkPath } from '../../../controls';
import { SystemBusiness } from '../../../business';
import { TextService } from '../../../utils';
import { defineComponent } from 'vue';

export default defineComponent({
  components: { CtrTree },
  data() {
    return {
      menus: (SystemBusiness.getSystemMenus() || []) as TreeNode[],
      controls: TextService.controls
    };
  },
  created() {
    checkPath(this.$route.path, this.menus, null, [], true);
    this.$watch('$route', () => {
      deselectItems(this.menus);
      checkPath(this.$route.path, this.menus, null, [], true);
    });
  },
  methods: {
    onClickMenu(menu: TreeNode): void {
      if (!menu.children?.length) {
        deselectItems(this.menus);
        menu.selected = true;
      }

      if (menu.expanded) {
        menu.expanded = false;
      } else {
        this.menus.forEach((item: TreeNode) => (item.expanded = false));
        menu.expanded = true;
      }
    }
  }
});
