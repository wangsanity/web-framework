import { TextService } from '@/utils';
import { CtrButton } from '../';
import { defineComponent } from 'vue';

export default defineComponent({
  components: { CtrButton },
  props: {
    loading: {
      default: false
    },
    title: {
      default: ''
    },
    /**
     * use v-if, no state kept
     */
    visible: {
      default: false
    },
    /**
     * use v-show, keep state
     */
    show: {
      default: true
    },
    showOkButton: {
      default: false
    },
    showCancelButton: {
      default: false
    },
    modalClickable: {
      default: true
    },
    okButtonText: {
      default: TextService.controls.confirm
    },
    cancelButtonText: {
      default: TextService.controls.cancel
    }
  },
  methods: {
    onOk(): void {
      this.$emit('okEvent');
    },
    onCancel(): void {
      this.$emit('cancelEvent');
    },
    onClose(): void {
      this.$emit('closeEvent');
    }
  }
});
