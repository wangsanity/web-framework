import { defineComponent } from 'vue';

export default defineComponent({
  emits: ['update:modelValue', 'changeEvent', 'enterEvent'],
  props: {
    readonly: {
      default: false
    },
    disabled: {
      default: false
    },
    focus: {
      default: false
    },
    error: {
      default: false
    },
    errorMessage: {
      default: false
    },
    modelValue: {
    },
    placeholder: {
      default: ''
    },
    customClass: {
      default: ''
    },
    type: {
      default: 'text'
    },
    showClearButton: {
      default: false
    }
  },
  methods: {
    onInputChange(event: any): void {
      this.$emit('update:modelValue', event.target.value);
      this.$emit('changeEvent', event);
    },
    onEnter(event: any): void {
      this.$emit('enterEvent', event);
    },
    onClear(event: any) {
      this.$emit('update:modelValue', '');
      event.stopPropagation();
    }
  }
});
