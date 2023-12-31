import {
  CtrTable,
  CtrPageBar,
  CtrDialog,
  CtrToolbar,
  type TableColumn,
  type TableOptions,
  type PageBarOptions,
  type TableButton
} from '../../controls';
import { ComSearch } from '../../components';
import { UserBusiness } from '../../business';
import { type QueryFilters, type User, type UserList } from '../../models';
import { defineComponent } from 'vue';
import { TextService } from '../../utils';
import type { PropType } from 'vue';
import ComUserProfile from '../user-profile/user-profile.vue';

export default defineComponent({
  components: { CtrTable, CtrPageBar, CtrDialog, ComUserProfile, ComSearch, CtrToolbar },
  props: {
    filters: {
      default: {} as QueryFilters,
      type: Object as PropType<QueryFilters>
    },
    showToolbar: {
      default: false
    },
    buttons: {
      default: [] as TableButton[],
      type: Object as PropType<TableButton[]>
    },
    columns: {
      default: [] as TableColumn[],
      type: Object as PropType<TableColumn[]>
    }
  },
  data() {
    return {
      tableOptions: {} as TableOptions,
      tableColumns: [] as TableColumn[],
      list: [] as User[],
      userProfileText: TextService.controls.userProfile,
      dialogVisible: false,
      loading: false,
      searching: false,
      pageBarOptions: { itemCount: 0 } as PageBarOptions,
      currentItem: {} as User,
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
      this.tableColumns =
        this.$props.columns?.length > 0
          ? this.$props.columns
          : [
              {
                headerText: this.controls.loginName,
                field: 'loginName',
                click: (item: User) => {
                  this.showDetail(item);
                }
              },
              { headerText: this.controls.fullName, field: 'fullName' },
              { headerText: this.controls.department, field: 'department' },
              { headerText: this.controls.birthday, field: 'birthday' },
              { headerText: this.controls.email, field: 'email' },
              { headerText: this.controls.remark, field: 'remark' }
            ];

      this.tableOptions.buttons = this.$props.buttons;
    },
    showDetail(item: User) {
      this.currentItem = item;
      this.dialogVisible = true;
    },
    getList(rebind: boolean = false) {
      if (rebind) {
        this.pageBarOptions.pageIndex = 1;
      }

      this.loading = true;
      UserBusiness.getList(this.queryFilters).then(
        (data: UserList) => {
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
