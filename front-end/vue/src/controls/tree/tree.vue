<template>
  <div class="ctr-tree">
    <com-tree-node class="tree-root" :items="items" :showCheckbox="showCheckbox" :theme="theme"
      @selectItem="onSelectItem($event)"></com-tree-node>
  </div>
</template>

<script lang="ts" src="./tree.ts"></script>
<style lang="scss" scoped src="./tree.scss"></style>
