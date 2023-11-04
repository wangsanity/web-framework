import { CtrButton, CtrInput, CtrCityPicker, type CityPickerResult } from '../../../controls';
import { UserBusiness } from '../../../business';
import { ToastService, TextService } from '../../../utils';
import { defineComponent } from 'vue';
import type { APIError, User } from '@/models';

export default defineComponent({
  components: { CtrButton, CtrInput, CtrCityPicker },
  props: {
    item: {
      default: {} as User
    }
  },
  data() {
    return {
      loading: false,
      submitted: false,
      loginName: '',
      fullName: '',
      editingItem: {} as User,
      controls: TextService.controls,
      messages: TextService.messages
    };
  },
  created() {
    if (this.$props.item) {
      this.editingItem = { ...this.$props.item };
    }

    this.$watch('item', () => {
      this.editingItem = { ...this.$props.item };
    });
  },
  methods: {
    onSave() {
      if (this.loading) {
        return;
      }

      this.submitted = true;
      this.loading = true;
      const method: Function = this.editingItem.userId ? UserBusiness.update : UserBusiness.insert;
      method(this.editingItem)
        .then((item: User) => {
          this.loading = false;
          this.$emit('saveEvent', item);
          this.$emit('cancelEvent');
        })
        .catch((err: APIError) => {
          this.loading = false;
          ToastService.notify(err.message || JSON.stringify(err), 'error');
        });
    },
    onCancel() {
      this.$emit('cancelEvent');
    },
    onSelectCity(picker: CityPickerResult) {
      this.editingItem.address =
        String(picker.province?.name) + String(picker.city?.name) + String(picker.area?.name);
    }
  }
});
