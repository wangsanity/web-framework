import { CtrButton, CtrInput } from '../../../controls';
import { RoleBusiness } from '../../../business';
import { ToastService, TextService } from '../../../utils';
import { defineComponent } from 'vue';
import type { APIError, Role } from '../../../models';

export default defineComponent({
  components: { CtrButton, CtrInput },
  props: {
    item: {
      default: {}
    }
  },
  data() {
    return {
      loading: false,
      submitted: false,
      name: '',
      description: '',
      order: 1,
      editingItem: {} as Role,
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
      const method: Function = this.editingItem.roleId ? RoleBusiness.update : RoleBusiness.insert;
      method(this.editingItem)
        .then((item: Role) => {
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
    }
  }
});
