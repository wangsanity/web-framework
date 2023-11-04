import { ComUserList } from '../../components';
import { type TableButton, CtrDialog, CtrConfirmDialog } from '../../controls';
import { UserBusiness } from '@/business';
import { ToastService, TextService } from '@/utils';
import { defineComponent } from 'vue';
import UserEdit from './user-edit/user-edit.vue';
import type { User } from '@/models';

export default defineComponent({
  components: { ComUserList, UserEdit, CtrDialog, CtrConfirmDialog },
  data() {
    return {
      tableButtons: [] as TableButton[],
      resetDialogVisible: false,
      editDialogVisible: false,
      userProfileText: TextService.controls.userProfile,
      confirmDialogVisible: false,
      deleting: false,
      resettingPassword: false,
      currentItem: {} as User,
      controls: TextService.controls,
      messages: TextService.messages
    };
  },
  created() {
    this.setOptions();
  },
  methods: {
    setOptions() {
      this.tableButtons = [
        {
          buttonText: this.controls.resetPassword,
          headerText: this.controls.resetPassword,
          click: (item: User) => {
            this.resetDialogVisible = true;
            this.currentItem = item;
          }
        },
        {
          buttonText: this.controls.edit,
          headerText: this.controls.edit,
          click: (item: User) => {
            this.editDialogVisible = true;
            this.currentItem = item;
          }
        },
        {
          buttonText: this.controls.delete,
          headerText: this.controls.delete,
          click: (item: User) => {
            this.confirmDialogVisible = true;
            this.currentItem = item;
          }
        }
      ];
    },
    onDelete() {
      this.deleting = true;
      UserBusiness.delete(Number(this.currentItem.userId)).then(
        () => {
          (this.$refs as any).userList.getList(true);
          this.deleting = false;
          this.confirmDialogVisible = false;
        },
        () => {
          this.deleting = false;
        }
      );
    },
    onResetPassword() {
      this.resettingPassword = true;
      UserBusiness.resetPassword(Number(this.currentItem.userId)).then(
        () => {
          this.resettingPassword = false;
          this.resetDialogVisible = false;
          ToastService.notify('this.messages.succeeded', 'success');
        },
        () => {
          this.resettingPassword = false;
        }
      );
    },
    onSave() {
      this.editDialogVisible = false;
      (this.$refs as any).userList.getList(true);
    },
    onToolbarClick() {
      this.currentItem = {} as User;
      this.editDialogVisible = true;
    }
  }
});
