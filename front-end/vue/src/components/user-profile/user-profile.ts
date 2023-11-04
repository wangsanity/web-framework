import type { User } from '../../models';
import { TextService } from '@/utils';
import { defineComponent } from 'vue';

export default defineComponent({
  props: {
    item: {
      default: {} as User
    }
  },
  data() {
    return {
      controls: TextService.controls
    }
  }
});
