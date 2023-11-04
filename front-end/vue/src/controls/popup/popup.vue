<template>
  <div class="ctr-popup-menu">
    <div :id="slotWrapperId" class="slot-wrapper" @click="onClickSlot">
      <slot></slot>
    </div>
    <div class="popup-content" :style="styles" v-if="displayPopup">
      <slot name="content"></slot>
    </div>
  </div>
</template>

<script lang="ts" src="./popup.ts"></script>
<style lang="scss" scoped src="./popup.scss"></style>
