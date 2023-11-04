<template>
  <div class="com-access-control">
    <div v-if="!loading">
      <div class="link-button-row">
        <span class="link-button" @click="onCheckAll(true)">{{controls.checkAll}}</span>
        <span class="link-button" @click="onCheckAll(false)">{{controls.uncheckAll}}</span>
      </div>
      <ctr-tree
        :items="menus"
        :showCheckbox="true"></ctr-tree>
    </div>
    <ctr-loading :absolute="true" v-else></ctr-loading>
  </div>
</template>

<script lang="ts" src="./access-control.ts"></script>
<style lang="scss" scoped type="text/css" src="./access-control.scss"></style>