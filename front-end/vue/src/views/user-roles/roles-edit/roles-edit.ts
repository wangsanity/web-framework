import { CtrButton, CtrInput, CtrCheckbox, CtrLoading } from '@/controls';
import { UserBusiness, RoleBusiness } from '@/business';
import { ToastService, TextService } from '@/utils';
import { defineComponent } from 'vue';
import type { Role, RoleList, UserRole } from '@/models';

export default defineComponent({
  components: { CtrButton, CtrInput, CtrCheckbox, CtrLoading },
  props: {
    item: {
      default: {} as UserRole
    }
  },
  data() {
    return {
      loading: false,
      saving: false,
      submitted: false,
      loginName: '',
      fullName: '',
      editingItem: {} as UserRole,
      list: [] as Role[],
      controls: TextService.controls
    };
  },
  created() {
    this.getList();
    if (this.$props.item) {
      this.setRole();
    }

    this.$watch('item', () => {
      this.setRole();
    });
  },
  methods: {
    setRole() {
      this.editingItem = { ...this.$props.item };
      this.setCheckBox();
    },
    getList() {
      this.loading = true;
      RoleBusiness.getList().then(
        (data: RoleList) => {
          this.list = data.list;
          this.setCheckBox();
          this.loading = false;
        },
        () => {
          this.loading = false;
        }
      );
    },
    setCheckBox() {
      if (this.list?.length > 0 && this.editingItem.roleList) {
        let target: Role | undefined;
        this.editingItem.roleList.forEach((item: Role) => {
          target = this.list.find((role: Role) => role.roleId === item.roleId);
          if (target) {
            target.checked = true;
          }
        });
      }
    },
    onSave() {
      if (this.saving) {
        return;
      }

      this.submitted = true;
      this.saving = true;
      UserBusiness.saveRoles(
        String(this.editingItem.userId),
        this.list.filter((role: Role) => role.checked).map((role: Role) => String(role.roleId))
      )
        .then(() => {
          this.saving = false;
          this.$emit('saveEvent');
          this.$emit('cancelEvent');
        })
        .catch((err) => {
          this.saving = false;
          ToastService.notify(err.message || err, 'error');
        });
    },
    onCancel() {
      this.$emit('cancelEvent');
    }
  }
});
