import { defineComponent } from 'vue';

export interface PopupMenu {
  name: string;
  url?: string;
  click?: Function;
}

export default defineComponent({
  props: {
    /**
     * format: vertical-horizontal. e.g. top-left
     */
    position: {},
    items: {
      default: [] as PopupMenu[]
    },
    customClass: {}
  },
  data() {
    return {
      styles: {} as any,
      displayMenu: false,
      slotWrapperId: 'slot-wrapper-' + new Date().getTime()
    };
  },
  beforeUnmount() {
    document.body.removeEventListener('click', this.onClickBody);
  },
  created() {
    this.updatePosition();

    document.body.addEventListener('click', this.onClickBody);
    this.$watch('items', () => {
      this.updatePosition();
    });
  },
  methods: {
    updatePosition() {
      setTimeout(() => {
        const slot: any = document.getElementById(this.slotWrapperId) || {};
        const position: string = ((this.$props as any).position || this.getAutoPosition()).split(
          '-'
        );
        this.styles = {
          [position[0] || 'top']: slot.offsetHeight + 3 + 'px',
          [position[1] || 'left']: 0
        };
      });
    },
    // TODO: calculate the best position
    getAutoPosition() {
      return 'top-left';
    },
    onClickSlot() {
      // execute after body click propagation
      if (!this.displayMenu) {
        setTimeout(() => {
          this.displayMenu = true;
        });
      }
    },
    onClickBody() {
      this.displayMenu = false;
    }
  }
});
