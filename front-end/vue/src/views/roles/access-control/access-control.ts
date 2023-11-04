import { CtrButton, CtrTree, type TreeNode, CtrLoading } from '@/controls';
import { expandAll, checkAll, clearUrl, checkTargets, getCheckedIds } from '@/controls';
import { RoleBusiness, SystemBusiness } from '@/business';
import { ToastService, TextService } from '@/utils';
import { defineComponent } from 'vue';
import { type Role } from '../../../models';

export default defineComponent({
  components: { CtrButton, CtrTree, CtrLoading },
  props: {
    item: {
      default: {} as Role
    }
  },
  data() {
    return {
      loading: false,
      saving: false,
      menus: [] as TreeNode[],
      controls: TextService.controls
    };
  },
  created() {
    this.menus = SystemBusiness.getSystemMenus();
    clearUrl(this.menus);
    expandAll(this.menus, true);
    this.getRoleAccessList();
    this.$watch('item', () => {
      this.getRoleAccessList();
    });
  },
  methods: {
    getRoleAccessList() {
      if (this.$props.item) {
        this.loading = true;
        RoleBusiness.getAccessList(Number(this.$props.item.roleId))
          .then((data: string[]) => {
            this.loading = false;
            checkTargets(this.menus, data);
          })
          .catch((err) => {
            this.loading = false;
            ToastService.notify(err, 'error');
          });
      }
    },
    onCheckAll(checked: boolean) {
      checkAll(this.menus, checked);
    },
    save() {
      if (this.saving) {
        return;
      }

      this.saving = true;
      RoleBusiness.saveAccessList(Number(this.$props.item.roleId), getCheckedIds(this.menus))
        .then(() => {
          this.saving = false;
          this.$emit('cancelEvent');
        })
        .catch((err) => {
          this.saving = false;
          this.$emit('cancelEvent');
          ToastService.notify(err, 'error');
        });
    }
  }
});
