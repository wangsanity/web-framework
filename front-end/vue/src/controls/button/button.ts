import { defineComponent } from 'vue';

export default defineComponent({
  emits: ['clickEvent'],
  props: {
    /**
     * 1: normal, 2: disabled, 3: loading
     */
    state: {
      default: 1
    },
    text: {
      default: ''
    },
    size: {
      default: ''
    },
    customClass: {
      default: ''
    },
    /**
     * primary | secondary
     */
    type: {
      default: 'primary'
    }
  },
  methods: {
    onClick() {
      if (this.state !== 1) {
        return;
      }
      this.$emit('clickEvent');
    }
  }
});
