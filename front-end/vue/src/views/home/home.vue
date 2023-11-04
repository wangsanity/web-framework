<template>
  <div class="home-view">
    <div class="content-wrapper">
      <div v-html="item" v-for="(item, index) in readMeContent" :key="index"></div>
    </div>
  </div>
</template>

<script lang="ts" src="./home.ts"></script>
<style lang="scss" scoped="" type="text/css" src="./home.scss"></style>
