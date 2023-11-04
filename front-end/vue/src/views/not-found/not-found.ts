import { TextService } from '@/utils';
import { defineComponent } from 'vue';

export default defineComponent({
  components: {},
  data() {
    return {
      notFound: TextService.messages.notFound
    }
  }
});
