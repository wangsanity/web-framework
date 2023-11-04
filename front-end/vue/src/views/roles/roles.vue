<template>
  <div class="roles-view">
    <div class="search-toolbar-wrapper">
      <com-search class="search-wrapper" :loading="searching" @searchEvent="onSearch"></com-search>
      <ctr-toolbar @clickEvent="onToolbarClick" class="toolbar-wrapper"></ctr-toolbar>
    </div>
    <div>
      <ctr-table :data="list" :columns="columns" :options="tableOptions"
        :loading="loading"></ctr-table>
    </div>
    <div class="page-bar-wrapper">
      <ctr-page-bar :pageIndex="pageBarOptions.pageIndex"
      :pageSize="pageBarOptions.pageSize"
      :itemCount="pageBarOptions.itemCount" @changeEvent="onPageUpdate($event)" ref="pageBar"></ctr-page-bar>
    </div>
    <ctr-dialog :visible="dialogVisible" @closeEvent="dialogVisible = false"
      :title="roleText" @cancelEvent="dialogVisible = false" :modalClickable="false">
      <role-edit @cancelEvent="dialogVisible = false" :item="editingItem" @saveEvent="onSave"></role-edit>
    </ctr-dialog>
    <ctr-confirm-dialog
      :visible="confirmDialogVisible"
      :loading="deleting"
      @okEvent="onDelete"
      @closeEvent="confirmDialogVisible = false"
      @cancelEvent="confirmDialogVisible = false">
      {{messages.deleteConfirm}}
    </ctr-confirm-dialog>
    <ctr-dialog :visible="accessControlDialogVisible"
      :loading="accessControlSaving"
      :title="accessControlText"
      :okButtonText="controls.save"
      :showOkButton="true"
      :showCancelButton="true"
      @closeEvent="accessControlDialogVisible = false"
      @okEvent="onSaveAccessControl"
      @cancelEvent="accessControlDialogVisible = false">
      <access-control ref="accessControl" :item="editingItem" @cancelEvent="accessControlDialogVisible=false"></access-control>
    </ctr-dialog>
    <ctr-dialog :visible="roleUsersDialogVisible" @closeEvent="roleUsersDialogVisible = false"
      :title="roleUsersText"
      @cancelEvent="roleUsersDialogVisible = false">
      <com-user-list :filters="userFilters"></com-user-list>
    </ctr-dialog>
  </div>
</template>

<script lang="ts" src="./roles.ts"></script>
<style lang="scss" scoped="" type="text/css" src="./roles.scss"></style>