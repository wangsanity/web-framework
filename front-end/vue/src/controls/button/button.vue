<template>
  <span class="ctr-button">
    <button type="button" :disabled="state !== 1"
      :class="['btn', 'btn-' + type, 'control-button', size ? 'btn-' + size : '', customClass]" @click="onClick">
      <div v-show="state === 3" class="icon-box">
        <img class="icon-loading" src="../../assets/images/loading.gif" />
      </div>
      {{ text }}
    </button>
  </span>
</template>

<script lang="ts" src="./button.ts"></script>
<style lang="scss" scoped src="./button.scss"></style>
