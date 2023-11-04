<template>
  <div class="ctr-popup-menu">
    <div :id="slotWrapperId" class="slot-wrapper" @click="onClickSlot">
      <slot></slot>
    </div>
    <div class="list-wrapper" :style="styles" v-if="displayMenu">
      <div class="list-item" v-for="(item, index) in items" :key="index" @click="item.click && item.click($event)">
        <a class="list-item-text" :href="item.url" v-if="item.url">{{ item.name }}</a>
        <span class="list-item-text" v-else>{{ item.name }}</span>
      </div>
    </div>
  </div>
</template>

<script lang="ts" src="./popup-menu.ts"></script>
<style lang="scss" scoped src="./popup-menu.scss"></style>
