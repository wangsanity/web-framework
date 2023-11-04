<template>
  <div class="user-profile-view">
    <com-user-profile class="user-profile" v-if="!loading" :item="user"></com-user-profile>
    <ctr-loading :absolute="true" v-else></ctr-loading>
  </div>
</template>

<script lang="ts" src="./user-profile.ts"></script>
<style lang="scss" scoped="" type="text/css" src="./user-profile.scss"></style>