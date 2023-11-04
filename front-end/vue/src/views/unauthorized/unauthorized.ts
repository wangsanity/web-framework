import { TextService } from '@/utils';
import { defineComponent } from 'vue'

export default defineComponent({
  components: {},
  data() {
    return {
      unauthorizedText: TextService.messages.unauthorized
    }
  }
});
