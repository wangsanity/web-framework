import { CtrButton, CtrInput } from '../../controls';
import { TextService } from '../../utils';
import { defineComponent } from 'vue';

export default defineComponent({
  components: { CtrButton, CtrInput },
  props: {
    loading: {
      default: false
    }
  },
  data() {
    return {
      keyword: '',
      controls: TextService.controls
    };
  },
  methods: {
    onSearch() {
      this.$emit('searchEvent', {
        keyword: this.keyword
      });
    }
  }
});
