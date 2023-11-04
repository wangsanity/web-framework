import { defineComponent } from 'vue';

export interface PageBarOptions {
  itemCount: number;
  pageCount?: number;
  pageIndex?: number;
  pageSize?: number;
}

export default defineComponent({
  computed: {
    listenChange() {
      const { pageSize, pageIndex, itemCount } = this.$props;
      return { pageSize, pageIndex, itemCount };
    }
  },
  props: {
    pageSize: {
      default: 20
    },
    pageIndex: {
      default: 1
    },
    pageCount: {
      default: 0
    },
    itemCount: {
      default: 0
    }
  },
  data() {
    return {
      itemInfo: '',
      next: 0,
      next2: 0,
      pageOptions: { itemCount: 0, pageCount: 0, pageIndex: 1, pageSize: 20 } as PageBarOptions,
      pageNumber: '' as number | string,
      pageSizes: [10, 20, 50, 100, 500],
      pageInfo: '',
      pre: 0,
      pre2: 0
    };
  },
  methods: {
    created() {
      this.$watch('listenChange', () => {
        this.initiatize();
      });
      this.initiatize();
    },
    initiatize() {
      if ((this.$props as any).options) {
        this.pageOptions = { ...(this.$props as any).options };
        if (!this.pageOptions.pageSize) {
          this.pageOptions.pageSize = 20;
        }
        if (this.pageOptions.pageIndex === undefined) {
          this.pageOptions.pageIndex = 1;
        }
      }
      this.updatePage(Number(this.pageOptions.pageIndex));
    },
    goPage() {
      if (!isNaN(Number(this.pageNumber))) {
        if (
          Number(this.pageNumber) - 0 > Number(this.pageOptions.pageCount) ||
          Number(this.pageNumber) - 0 < 1 ||
          Number(this.pageNumber) - 0 === this.pageOptions.pageIndex
        ) {
          return;
        }
        this.selectPage(Number(this.pageNumber) - 0);
      }
    },
    selectPage(currentPage: number, forceUpdate = false) {
      if (
        !forceUpdate &&
        (this.pageOptions.itemCount === 0 ||
          currentPage === this.pageOptions.pageIndex ||
          currentPage > Number(this.pageOptions.pageCount) ||
          currentPage < 1)
      ) {
        return;
      }
      this.updatePage(currentPage);
      this.$emit('changeEvent', { ...this.pageOptions });
    },
    setOptions(options: PageBarOptions) {
      this.pageOptions = { ...this.pageOptions, ...options };
      this.updatePage(Number(this.pageOptions.pageIndex));
    },
    updatePage(currentPage: number) {
      const pageSize = Number(this.pageOptions.pageSize) - 0;
      if (pageSize <= 0 || currentPage <= 0) {
        return;
      }

      if (!currentPage) {
        this.pageOptions.pageIndex = 1;
        this.pageNumber = '';
      } else {
        this.pageOptions.pageIndex = currentPage;
      }
      this.pageOptions.pageCount = Math.ceil(this.pageOptions.itemCount / pageSize);
      this.pageInfo =
        this.pageOptions.itemCount === 0
          ? '0/0'
          : this.pageOptions.pageIndex + '/' + this.pageOptions.pageCount;
      const current = Number(this.pageOptions.pageIndex) - 1;
      const to =
        pageSize * (current + 1) > this.pageOptions.itemCount
          ? this.pageOptions.itemCount
          : pageSize * (current + 1);
      this.itemInfo =
        this.pageOptions.itemCount === 0
          ? '0/0'
          : current * pageSize + 1 + '-' + to + ' / ' + this.pageOptions.itemCount;

      this.pre = Number(this.pageOptions.pageIndex) - 1;
      this.pre2 = Number(this.pageOptions.pageIndex) - 2;

      this.next = Number(this.pageOptions.pageIndex) + 1;
      this.next2 = Number(this.pageOptions.pageIndex) + 2;
    },
    updatePageSize(event: any) {
      if (event.target.value) {
        this.selectPage(1, true);
      }
    }
  }
});
