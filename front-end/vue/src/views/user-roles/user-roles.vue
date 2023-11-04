<template>
  <div class="user-roles-view">
    <user-role-list ref="userList" :buttons="tableButtons" :columns="columns"></user-role-list>
    <ctr-dialog :visible="rolesDialogVisible" @closeEvent="rolesDialogVisible = false"
      :title="userRolesText" @cancelEvent="rolesDialogVisible = false">
      <roles-edit @cancelEvent="rolesDialogVisible = false" :item="currentItem" @saveEvent="onSave"></roles-edit>
    </ctr-dialog>
  </div>
</template>

<script lang="ts" src="./user-roles.ts"></script>
<style lang="scss" scoped="" type="text/css" src="./user-roles.scss"></style>