<template>
  <div class="ctr-tool-bar">
    <span v-if="buttons.new" class="button-box" @click="onClick('new')">
      <i class="fa fa-plus-square-o"></i>
      <span class="button-text">{{ controls.new }}</span>
    </span>
    <span v-if="buttons.settings" class="button-box" @click="onClick('settings')">
      <i class="fa fa-cog"></i>
      <span class="button-text">{{ controls.settings }}</span>
    </span>
    <span v-if="buttons.chart" class="button-box" @click="onClick('chart')">
      <i class="fa fa-bar-chart"></i>
      <span class="button-text">{{ controls.statistics }}</span>
    </span>
  </div>
</template>

<script lang="ts" src="./toolbar.ts"></script>
<style lang="scss" scoped src="./toolbar.scss"></style>
