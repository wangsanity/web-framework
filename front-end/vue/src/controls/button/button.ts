import { defineComponent } from 'vue';

export default defineComponent({
  emits: ['clickEvent'],
  props: {
    disabled: {
      default: false
    },
    isLoading: {
      default: false
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
      if (this.disabled || this.isLoading) {
        return;
      }
      this.$emit('clickEvent');
    }
  }
});
