import { TextService } from '@/utils';
import { CtrDialog } from '..';
import { defineComponent } from 'vue';

export default defineComponent({
  emits: ['cancelEvent', 'closeEvent'],
  components: { CtrDialog },
  props: {
    loading: {
      default: false
    },
    visible: {
      default: false
    },
    title: {
      default: ''
    },
    showOkButton: {
      default: true
    },
    showCancelButton: {
      default: true
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
    onCancel(): void {
      this.$emit('cancelEvent');
    },
    onClose(): void {
      this.$emit('closeEvent');
    }
  }
});
