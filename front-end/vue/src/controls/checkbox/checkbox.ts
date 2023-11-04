import { defineComponent } from 'vue';

export default defineComponent({
  emits: ['update:modelValue', 'changeEvent'],
  props: {
    modelValue: {
      default: ''
    },
    text: {
      default: ''
    },
    customClass: {
      default: ''
    }
  },
  methods: {
    onClick(event: any): void {
      this.$emit('update:modelValue', event.target.checked);
      this.$emit('changeEvent', event);
    }
  }
});
