<template>
  <div class="com-roles-edit">
    <div class="roles-wrapper" v-if="!loading">
      <span :key="index" v-for="(item, index) in list">
        <span class="checkbox-wrapper">
          <ctr-checkbox v-model="item.checked" :text="item.name"></ctr-checkbox>
        </span>
      </span>
    </div>
    <ctr-loading :absolute="true" v-else></ctr-loading>
    <div class="button-row">
      <ctr-button
        :isLoading="loading"
        :text="controls.save"
        @clickEvent="onSave"></ctr-button>
      <ctr-button
        type="secondary"
        :text="controls.cancel"
        @clickEvent="onCancel"></ctr-button>
    </div>
  </div>
</template>

<script lang="ts" src="./roles-edit.ts"></script>
<style lang="scss" scoped type="text/css" src="./roles-edit.scss"></style>