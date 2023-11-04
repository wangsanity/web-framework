<template>
  <ctr-dialog :visible="visible" :title="title" :showOkButton="showOkButton"
    :showCancelButton="showCancelButton" :modalClickable="modalClickable" :okButtonText="okButtonText"
    :cancelButtonText="cancelButtonText" :loading="loading" @closeEvent="onClose" @cancelEvent="onCancel">
    <slot></slot>
  </ctr-dialog>
</template>

<script lang="ts" src="./confirm-dialog.ts"></script>
