import { type TableOptions, type TableColumn } from './table.interface';
import { FormatService, TextService } from '../../utils';
import { defineComponent } from 'vue';

export default defineComponent({
  computed: {
    listenChange() {
      const { options, columns, data } = this.$props;
      return { options, columns, data };
    }
  },
  props: {
    options: {
      default: {}
    },
    columns: {
      default: [] as TableColumn[]
    },
    data: {
      default: []
    },
    loading: {
      default: false
    }
  },
  created() {
    this.update();
    this.$watch('listenChange', () => {
      this.update();
    });
  },
  data() {
    return {
      tableOptions: {} as TableOptions,
      tableData: [] as any[],
      formatDate: FormatService.formatDate,
      operationText: TextService.controls.operation,
      noData: TextService.messages.noData
    };
  },
  methods: {
    update() {
      const columns: TableColumn[] = (this as any).columns;
      const props: any = this.$props as any;
      if (props.options) {
        this.tableOptions = props.options;
      }

      if (this.tableOptions.alwaysShowHeader !== false) {
        this.tableOptions.alwaysShowHeader = true;
      }

      if (this.tableOptions.buttonInGroup !== false) {
        this.tableOptions.buttonInGroup = true;
      }

      if (props.data) {
        this.tableData = JSON.parse(JSON.stringify(props.data));
      }

      if (props.columns) {
        let tempString = '';
        for (let i = 0; i < columns.length; i++) {
          if (columns[i].template) {
            tempString = columns[i].template;
            if (this.tableData && props.data.length > 0) {
              for (let j = 0; j < props.data.length; j++) {
                for (let m = 0; m < columns.length; m++) {
                  tempString = tempString.replace(
                    '{{' + columns[m].field + '}}',
                    this.tableData[j][columns[m].field as any]
                  );
                }
                this.tableData[j][columns[i].field as any] = tempString;
              }
            }
          }
        }
      }
    },
    checkAll() {
      this.tableOptions.checkAllState = !this.tableOptions.checkAllState;
      let allChecked = true;
      for (let i = 0; i < this.tableData.length; i++) {
        if (!this.tableData[i].checkState) {
          allChecked = false;
          break;
        }
      }
      for (let i = 0; i < this.tableData.length; i++) {
        this.tableData[i].checkState = !allChecked;
      }
    },
    checkOne(item: any) {
      item.checkState = !item.checkState;
      let allChecked = true;
      for (let i = 0; i < this.tableData.length; i++) {
        if (!this.tableData[i].checkState) {
          allChecked = false;
          break;
        }
      }
      this.tableOptions.checkAllState = allChecked;
    },
    getCheckedItems() {
      return (this.tableData || []).filter((item: any) => item.checkState);
    },
    onHeaderClick(header: any) {
      if (header) {
        if (header.click) {
          header.click(header);
        }
      }
    },
    onRowClick(item: any) {
      if (this.tableOptions.rowClick) {
        this.tableOptions.rowClick(item);
      }
    }
  }
});
