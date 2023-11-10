<template>
  <button type="button" :disabled="disabled || isLoading"
    :class="['btn', 'btn-' + type, 'control-button', size ? 'btn-' + size : '', customClass]" @click="onClick">
    <div v-if="isLoading" class="icon-box">
      <img class="icon-loading" src="../../assets/images/loading.gif" />
    </div>
    {{ text }}
  </button>
</template>

<script lang="ts" src="./button.ts"></script>
<style lang="scss" scoped src="./button.scss"></style>
