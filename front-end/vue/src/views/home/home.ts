import { SystemBusiness } from '@/business';
import { StringService } from '@/utils';
import { defineComponent } from 'vue';

export default defineComponent({
  components: {},
  data() {
    return {
      readMeContent: [] as string[]
    };
  },
  created() {
    this.getReadMe();
  },
  methods: {
    getReadMe() {
      SystemBusiness.getReadMe().then((data: string) => {
        this.readMeContent = StringService.markDownToHTML(data);
      });
    }
  }
});
