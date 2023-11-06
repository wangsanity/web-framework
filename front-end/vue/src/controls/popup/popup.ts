import { defineComponent } from 'vue';

export default defineComponent({
  props: {
    /**
     * format: vertical-horizontal. e.g. top-left
     */
    position: {},
    items: {},
    customClass: {}
  },
  created() {
    this.updatePosition();

    document.body.addEventListener('click', this.onClickBody);
  },
  beforeUnmount() {
    document.body.removeEventListener('click', this.onClickBody);
  },
  data() {
    return {
      styles: {} as any,
      displayPopup: false,
      slotWrapperId: 'slot-wrapper-' + new Date().getTime()
    };
  },
  methods: {
    updatePosition() {
      setTimeout(() => {
        const slot = document.getElementById(this.slotWrapperId);
        const position: string = ((this.$props as any).position || this.getAutoPosition()).split(
          '-'
        );
        this.styles = {
          [position[0] || 'top']: ((slot ? slot.offsetHeight : 0) + 3) + 'px',
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
      if (!this.displayPopup) {
        setTimeout(() => {
          this.displayPopup = true;
        });
      }
    },
    onClickBody() {
      this.displayPopup = false;
    }
  }
});
