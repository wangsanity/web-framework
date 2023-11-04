import { ComUserProfile } from '@/components';
import { CtrLoading } from '@/controls';
import { BaseInfoService, UserBusiness } from '@/business';
import { ToastService, TextService } from '@/utils';
import { defineComponent } from 'vue';
import type { User } from '../../models';

export default defineComponent({
  components: { ComUserProfile, CtrLoading },
  data() {
    return {
      user: {} as User,
      loading: false,
      messages: TextService.messages
    };
  },
  created() {
    this.getUserProfile();
  },
  methods: {
    getUserProfile() {
      this.loading = true;
      const user = BaseInfoService.getUser();
      if (user) {
        UserBusiness.get(user.userId)
          .then((user: User) => {
            this.loading = false;
            this.user = user;
          })
          .catch((err) => {
            this.loading = false;
            ToastService.notify(err, 'error');
          });
      } else {
        ToastService.notify(this.messages.invalidParameters, 'error');
        this.loading = false;
      }
    }
  }
});
