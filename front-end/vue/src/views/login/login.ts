import { CtrButton, CtrInput } from '../../controls';
import { ToastService, TextService } from '../../utils';
import { UserBusiness, BaseInfoService } from '../../business';
import { routeNames } from '../../router';
import { defineComponent } from 'vue';
import type { APIError } from '../../models';

export default defineComponent({
  components: { CtrButton, CtrInput },
  props: ['url'],
  data() {
    return {
      loading: false,
      submitted: false,
      password: '',
      userName: '',
      controls: TextService.controls,
      messages: TextService.messages
    };
  },
  created() {
    this.userName = BaseInfoService.getUser()?.loginName || '';
  },
  methods: {
    login() {
      if (this.loading) {
        return;
      }

      this.submitted = true;
      this.loading = true;
      UserBusiness.login(this.userName, this.password)
        .then(() => {
          this.loading = false;
          if (this.$route.params.url) {
            window.location.href = this.$route.params.url as string;
          } else {
            this.$router.push({ name: routeNames.home });
          }
        })
        .catch((err: APIError) => {
          this.loading = false;
          ToastService.notify(err.message || JSON.stringify(err), 'error');
        });
    },
    reset() {
      this.userName = '';
      this.password = '';
      this.submitted = false;
    }
  }
});
