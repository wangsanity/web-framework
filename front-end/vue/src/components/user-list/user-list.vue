<template>
  <div class="com-user-list">
    <div class="search-toolbar-wrapper">
      <com-search class="search-wrapper" :loading="searching" @searchEvent="onSearch"></com-search>
      <ctr-toolbar v-if="showToolbar" @clickEvent="onToolbarClick" class="toolbar-wrapper"></ctr-toolbar>
    </div>
    <div>
      <ctr-table :data="list" :columns="tableColumns" :options="tableOptions" :loading="loading"></ctr-table>
    </div>
    <div class="page-bar-wrapper">
      <ctr-page-bar :pageIndex="pageBarOptions.pageSize" :pageSize="pageBarOptions.pageSize"
        :itemCount="pageBarOptions.itemCount" @changeEvent="onPageUpdate()" ref="pageBar"></ctr-page-bar>
    </div>
    <ctr-dialog :visible="dialogVisible" @closeEvent="dialogVisible = false" :title="userProfileText">
      <com-user-profile :item="currentItem"></com-user-profile>
    </ctr-dialog>
  </div>
</template>

<script lang="ts" src="./user-list.ts"></script>
<style lang="scss" scoped src="./user-list.scss"></style>
