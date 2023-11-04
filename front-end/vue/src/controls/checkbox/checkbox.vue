<template>
  <span class="ctr-checkbox">
    <input type="checkbox" :checked="Boolean(modelValue)" :class="[customClass]" @click="onClick" />
    <span class="checkbox-text" v-if="text">
      {{ text }}
    </span>
  </span>
</template>

<script lang="ts" src="./checkbox.ts"></script>
<style lang="scss" scoped src="./checkbox.scss"></style>
