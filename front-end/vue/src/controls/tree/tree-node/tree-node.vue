<template>
  <div class="ctr-tree-child">
    <div v-for="(item, index) in items" :key="item.id || index" class="ctr-tree-node">
      <div :class="'ctr-tree-node-name theme-' + theme">
        <span v-if="item.children && item.children.length > 0">
          <span class="ctr-tree-node-icon">
            <i v-if="item.expanded" @click="onExpand(item, false)" class="fa fa-minus-square-o expand-icon"></i>
            <i v-else @click="onExpand(item, true)" class="fa fa-plus-square-o expand-icon"></i>
          </span>
        </span>
        <span class="ctr-tree-node-name-item" :class="item.selected ? 'ctr-tree-node-name-selected' : ''">
          <span :class="!item.children?.length ? 'leaf-with-parent' : ''">
            <input v-if="showCheckbox" :checked="item.checked" @click="onCheckItem(item)" class="node-checkbox"
              type="checkbox" />
            <span class="ctr-tree-node-name-text" @click="onSelectItem(item)">
              <span class="node-text-wrapper" v-if="!item.url">{{ item.name }}</span>
              <router-link class="node-text-wrapper" v-else :to="item.url">{{ item.name }}</router-link>
            </span>
          </span>
        </span>
      </div>
      <span v-if="item.children && item.children.length > 0" v-show="item.expanded">
        <tree-node :items="item.children" :showCheckbox="showCheckbox" @selectItem="onSelectItem($event)"></tree-node>
      </span>
    </div>
  </div>
</template>

<script lang="ts" src="./tree-node.ts"></script>
<style lang="scss" scoped src="./tree-node.scss"></style>
