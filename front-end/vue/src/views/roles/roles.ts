import { ComSearch, ComUserList } from '../../components';
import {
  CtrButton,
  CtrInput,
  CtrToolbar,
  CtrTable,
  CtrDialog,
  CtrPageBar,
  CtrConfirmDialog,
  type TableColumn,
  type TableOptions,
  type PageBarOptions
} from '../../controls';
import { RoleBusiness } from '../../business';
import RoleEdit from './role-edit/role-edit.vue';
import AccessControl from './access-control/access-control.vue';
import { type QueryFilters, type Role, type RoleList } from '../../models';
import { defineComponent } from 'vue';
import { TextService } from '../../utils';

export default defineComponent({
  components: {
    CtrButton,
    CtrInput,
    CtrToolbar,
    ComSearch,
    ComUserList,
    CtrTable,
    CtrPageBar,
    CtrDialog,
    CtrConfirmDialog,
    RoleEdit,
    AccessControl
  },
  data() {
    return {
      tableOptions: {} as TableOptions,
      columns: [] as TableColumn[],
      list: [] as Role[],
      loading: false,
      searching: false,
      deleting: false,
      dialogVisible: false,
      roleText: TextService.controls.role,
      accessControlText: TextService.controls.accessControl,
      roleUsersText: TextService.controls.roleUsers,
      confirmDialogVisible: false,
      roleUsersDialogVisible: false,
      accessControlDialogVisible: false,
      accessControlSaving: false,
      pageBarOptions: { itemCount: 0 } as PageBarOptions,
      editingItem: {} as Role,
      userFilters: {} as QueryFilters,
      roleFilters: {} as QueryFilters,
      controls: TextService.controls,
      messages: TextService.messages
    };
  },
  created() {
    this.setTableConfig();
    this.getList();
  },
  methods: {
    getList() {
      this.loading = true;
      RoleBusiness.getList(this.roleFilters).then(
        (data: RoleList) => {
          this.pageBarOptions.itemCount = data.count;
          (this.$refs as any).pageBar.setOptions(this.pageBarOptions);
          this.list = data.list;
          this.loading = false;
          this.searching = false;
        },
        () => {
          this.loading = false;
          this.searching = false;
        }
      );
    },
    setTableConfig() {
      this.columns = [
        { headerText: this.controls.name, field: 'name' },
        { headerText: this.controls.description, field: 'description' },
        { headerText: this.controls.order, field: 'order' }
      ];

      this.tableOptions = {
        buttons: [
          {
            buttonText: this.controls.roleUsers,
            headerText: this.controls.roleUsers,
            click: (item: Role) => {
              this.userFilters.roleId = String(item.roleId);
              this.roleUsersDialogVisible = true;
              this.editingItem = item;
            }
          },
          {
            buttonText: this.controls.accessControl,
            headerText: this.controls.accessControl,
            click: (item: Role) => {
              this.accessControlDialogVisible = true;
              this.accessControlSaving = false;
              this.editingItem = item;
            }
          },
          {
            buttonText: this.controls.edit,
            headerText: this.controls.edit,
            click: (item: Role) => {
              this.dialogVisible = true;
              this.editingItem = item;
            }
          },
          {
            buttonText: this.controls.delete,
            headerText: this.controls.delete,
            click: (item: Role) => {
              this.confirmDialogVisible = true;
              this.editingItem = item;
            }
          }
        ]
      };
    },
    onSave() {
      this.getList();
    },
    onDelete() {
      this.deleting = true;
      RoleBusiness.delete(Number(this.editingItem.roleId)).then(
        () => {
          this.pageBarOptions.pageIndex = 1;
          this.getList();
          this.deleting = false;
          this.confirmDialogVisible = false;
        },
        () => {
          this.deleting = false;
        }
      );
    },
    onPageUpdate(options: PageBarOptions) {
      console.log(options);
    },
    onToolbarClick() {
      this.editingItem = { order: 1 };
      this.dialogVisible = true;
    },
    onSearch(filters: QueryFilters) {
      this.searching = true;
      this.roleFilters = { ...filters, pageIndex: 1 };
      this.getList();
    },
    onSaveAccessControl() {
      this.accessControlSaving = true;
      (this.$refs as any).accessControl.save();
    }
  }
});
