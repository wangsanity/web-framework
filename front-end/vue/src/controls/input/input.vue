<template>
  <span class="ctr-input">
    <input v-focus="focus" :type="type" :readonly="readonly" :disabled="disabled" :placeholder="placeholder"
      :value="modelValue" :class="['control-input', error ? 'input-error' : '', customClass]"
      @keyup.enter="onEnter($event)" @input="onInputChange($event)" />
    <span class="error-message" v-if="error && errorMessage">
      {{ errorMessage }}
    </span>
    <i class="fa fa-close" v-if="showClearButton && modelValue" @click="onClear"></i>
  </span>
</template>

<script lang="ts" src="./input.ts"></script>
<style lang="scss" scoped src="./input.scss"></style>
