import { type TableColumn, type TableButton, CtrDialog } from '../../controls';
import { defineComponent } from 'vue';
import { TextService } from '@/utils';
import type { UserRole } from '../../models';
import RolesEdit from './roles-edit/roles-edit.vue';
import UserRoleList from './user-role-list/user-role-list.vue';

export default defineComponent({
  components: { UserRoleList, CtrDialog, RolesEdit },
  data() {
    return {
      tableButtons: [] as TableButton[],
      columns: [] as TableColumn[],
      rolesDialogVisible: false,
      userRolesText: TextService.controls.userRoles,
      currentItem: {} as UserRole,
      controls: TextService.controls
    };
  },
  created() {
    this.setOptions();
  },
  methods: {
    setOptions() {
      this.columns = [
        {
          headerText: this.controls.loginName,
          field: 'loginName',
          click: (item: UserRole) => {
            this.currentItem = item;
            (this.$refs as any).userList.showDetail(this.currentItem);
          }
        },
        { headerText: this.controls.fullName, field: 'fullName' },
        { headerText: this.controls.department, field: 'department' },
        { headerText: this.controls.remark, field: 'remark' },
        { headerText: this.controls.roles, field: 'roles' }
      ];

      this.tableButtons = [
        {
          buttonText: this.controls.userRoles,
          headerText: this.controls.userRoles,
          click: (item: UserRole) => {
            this.rolesDialogVisible = true;
            this.currentItem = item;
          }
        }
      ];
    },
    onSave() {
      this.rolesDialogVisible = false;
    }
  }
});
