<template>
  <div class="menus-wrapper">
    <div class="top-menu">
      <span class="top-menu-button">
        <i class="fa fa-home"></i>
        <router-link to="/home">{{controls.home}}</router-link>
      </span>
    </div>
    <div class="menus-box">
      <div class="menus-container">
        <div class="menu-item" v-for="menu in menus" :key="menu.id">
          <div class="menu-item-name" @click="onClickMenu(menu)">
            <span class="menu-item-text" :class="menu.selected ? 'menu-selected' : ''" :title="menu.name">
              <i class="menu-icon" :style="{color: menu.iconColor || '#677199'}" :class="menu.icon || 'fa fa-folder-o'"></i>
              {{menu.name}}
            </span>
            <i class="fa fa-sort-desc"></i>
          </div>
          <div class="sub-items" v-if="menu.children?.length" v-show="menu.expanded">
            <ctr-tree :items="menu.children"></ctr-tree>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" src="./menus.ts"></script>
<style lang="scss" scoped src="./menus.scss"></style>
