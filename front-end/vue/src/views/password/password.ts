import { CtrButton, CtrInput } from '@/controls';
import { UserBusiness } from '@/business';
import { ToastService, TextService } from '@/utils';
import { defineComponent } from 'vue';

export default defineComponent({
  components: { CtrButton, CtrInput },
  data() {
    return {
      loading: false,
      submitted: false,
      originalPassword: '',
      newPassword: '',
      passwordConfirm: '',
      messages: TextService.messages,
      controls: TextService.controls
    };
  },
  methods: {
    onSave() {
      this.submitted = true;
      this.loading = true;
      UserBusiness.modifyPassword(this.originalPassword, this.newPassword, this.passwordConfirm)
        .then(() => {
          this.loading = false;
          this.submitted = false;
          this.onReset();
          ToastService.notify(this.messages.succeeded, 'success');
        })
        .catch((err) => {
          this.loading = false;
          ToastService.notify(err.message || err, 'error');
        });
    },
    onReset() {
      this.submitted = false;
      this.originalPassword = '';
      this.newPassword = '';
      this.passwordConfirm = '';
    }
  }
});
