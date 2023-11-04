import { defineComponent } from 'vue';

export default defineComponent({
  props: {
    /**
     * default is fixed position
     */
    absolute: {
      default: false
    }
  }
});
