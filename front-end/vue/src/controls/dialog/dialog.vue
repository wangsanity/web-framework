<template>
  <div class="ctr-dialog" v-show="show" v-if="visible">
    <div class="dialog-bg" @click="modalClickable && onClose()"></div>
    <div class="dialog-body">
      <i @click="onClose" class="fa fa-close"></i>
      <slot name="header"></slot>
      <div class="dialog-title" v-if="title">
        {{ title }}
      </div>
      <div class="dialog-content" :class="!title ? 'no-title-body' : ''">
        <slot></slot>
      </div>
      <div class="dialog-footer" v-if="showOkButton || showCancelButton">
        <ctr-button @clickEvent="onOk" :text="okButtonText" :state="loading ? 3 : 1"></ctr-button>
        <ctr-button @clickEvent="onCancel" :text="cancelButtonText" type="secondary"></ctr-button>
      </div>
      <slot name="footer"></slot>
    </div>
  </div>
</template>

<script lang="ts" src="./dialog.ts"></script>
<style lang="scss" scoped src="./dialog.scss"></style>
