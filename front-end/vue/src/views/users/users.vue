<template>
  <div class="users-view">
    <com-user-list ref="userList" :buttons="tableButtons" :showToolbar="true" @toolbarEvent="onToolbarClick"></com-user-list>
    <ctr-dialog :visible="editDialogVisible" @closeEvent="editDialogVisible = false"
      :title="userProfileText" @cancelEvent="editDialogVisible = false" :modalClickable="false">
      <user-edit @cancelEvent="editDialogVisible = false" :item="currentItem" @saveEvent="onSave"></user-edit>
    </ctr-dialog>
    <ctr-confirm-dialog
      :visible="confirmDialogVisible"
      :loading="deleting"
      @okEvent="onDelete"
      @closeEvent="confirmDialogVisible = false"
      @cancelEvent="confirmDialogVisible = false">
      {{messages.deleteConfirm}}
    </ctr-confirm-dialog>
    <ctr-confirm-dialog
      :visible="resetDialogVisible"
      :loading="resettingPassword"
      :title="controls.resetPassword"
      @okEvent="onResetPassword"
      @closeEvent="resetDialogVisible = false"
      @cancelEvent="resetDialogVisible = false">
      {{messages.resetPasswordConfirm}}
    </ctr-confirm-dialog>
  </div>
</template>

<script lang="ts" src="./users.ts"></script>
<style lang="scss" scoped="" type="text/css" src="./users.scss"></style>