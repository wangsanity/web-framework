import { TextService } from '@/utils';
import { defineComponent } from 'vue';

export default defineComponent({
  props: {
    buttons: {
      default() {
        return {
          new: true,
          settings: false,
          chart: false
        };
      }
    }
  },
  data() {
    return {
      controls: TextService.controls
    };
  },
  methods: {
    onClick(type: any) {
      this.$emit('clickEvent', type);
    }
  }
});
