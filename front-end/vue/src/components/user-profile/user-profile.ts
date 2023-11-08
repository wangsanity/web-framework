import type { User } from '../../models';
import { TextService } from '@/utils';
import { defineComponent, type PropType } from 'vue';

export default defineComponent({
  props: {
    item: {
      default: {} as User,
      type: Object as PropType<User>
    }
  },
  data() {
    return {
      controls: TextService.controls
    };
  }
});
