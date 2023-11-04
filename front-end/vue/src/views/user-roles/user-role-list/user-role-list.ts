import {
  CtrTable,
  CtrPageBar,
  CtrDialog,
  CtrToolbar,
  type TableColumn,
  type TableOptions,
  type PageBarOptions
} from '../../../controls';
import { ComSearch, ComUserProfile } from '../../../components';
import { UserRoleBusiness } from '../../../business';
import { type QueryFilters, type UserRole, type UserRoleList } from '../../../models';
import { defineComponent } from 'vue';
import { TextService } from '../../../utils';

export default defineComponent({
  components: { CtrTable, CtrPageBar, CtrDialog, ComUserProfile, ComSearch, CtrToolbar },
  props: {
    item: {
      default: {}
    },
    filters: {
      default: {}
    },
    showToolbar: {
      default: false
    },
    buttons: {
      default: []
    },
    columns: {
      default: []
    }
  },
  data() {
    return {
      tableOptions: {} as TableOptions,
      tableColumns: [] as TableColumn[],
      list: [] as UserRole[],
      userProfileText: TextService.controls.userProfile,
      dialogVisible: false,
      loading: false,
      searching: false,
      pageBarOptions: { itemCount: 0 } as PageBarOptions,
      currentItem: {} as UserRole,
      queryFilters: {} as QueryFilters,
      controls: TextService.controls
    };
  },
  created() {
    this.queryFilters = { ...this.$props.filters };
    this.setTableConfig();
    this.getList();
  },
  methods: {
    setTableConfig() {
      this.tableColumns = this.columns;
      this.tableOptions.buttons = this.$props.buttons;
    },
    showDetail(item: UserRole) {
      this.currentItem = item;
      this.dialogVisible = true;
    },
    getList(rebind: boolean = false) {
      if (rebind) {
        this.pageBarOptions.pageIndex = 1;
      }

      this.loading = true;
      UserRoleBusiness.getList(this.queryFilters).then(
        (data: UserRoleList) => {
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
    onSearch(filters: QueryFilters) {
      this.searching = true;
      this.queryFilters = { ...filters, pageIndex: 1, ...this.$props.filters };
      this.getList();
    },
    onPageUpdate() {},
    onToolbarClick(type: string) {
      this.$emit('toolbarEvent', type);
    }
  }
});
