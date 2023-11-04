<template>
  <div class="master-box">
    <div class="navigation">
      <span class="navigation-left">
        <i class="fa fa-bicycle"></i>
        <span class="site-name">{{messages.siteName}}</span>
      </span>
      <span class="navigation-right">
        <span class="language-wrapper">
          <ctr-popup-menu :items="languages" position="top-left" class="popup-wrapper">
            <span class="display-name">{{currentLanguage}}</span>
            <i class="fa fa-sort-desc"></i>
          </ctr-popup-menu>
        </span>
        <ctr-popup-menu :items="userMenus" position="top-right" class="popup-wrapper">
          <span class="display-name">{{userToken?.loginName}}</span>
          <i class="fa fa-sort-desc"></i>
        </ctr-popup-menu>
        <img class="icon-head" src="../../assets/images/male.png"/>
      </span>
    </div>
    <div class="main">
      <div class="main-left">
        <Menus />
      </div>
      <div class="router-view-wrapper">
        <router-view class="router-view"></router-view>
      </div>
    </div>
  </div>
</template>

<script lang="ts" src="./master.ts"></script>
<style lang="scss" scoped src="./master.scss"></style>
