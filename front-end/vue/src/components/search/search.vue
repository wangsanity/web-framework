<template>
  <div class="com-search">
    <span class="search-item">
      <span class="search-label">{{controls.keyword}}:</span>
      <span class="search-control">
        <ctr-input
          v-model="keyword"
          :placeholder="controls.keyword"
          @enterEvent="onSearch"></ctr-input>
      </span>
    </span>
    <span class="search-item">
      <ctr-button
        :text="controls.search"
        :isLoading="loading"
        @clickEvent="onSearch"></ctr-button>
    </span>
  </div>
</template>

<script lang="ts" src="./search.ts"></script>
<style lang="scss" scoped src="./search.scss"></style>
