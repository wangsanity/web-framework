<template>
  <div class="ctr-city-picker" @click="onClickPicker">
    <div :id="citySlotId" class="city-slot-wrapper" @click="onClickSlot"><slot></slot></div>
    <div class="city-picker-content" :style="styles" v-if="displayPopup">
      <div class="city-picker-wrapper">
        <div class="title-box">
          <div class="data-title province-title">{{controls.province}}</div>
          <div class="data-title city-title">{{controls.city}}</div>
          <div class="data-title town-title">{{controls.town}}</div>
        </div>
        <div class="data-area">
          <div class="province-box">
            <div class="item-box" @click="selectProvince(item)" v-for="(item, index) in allProvinces" :key="index">
              <span :title="item.name" :class="item==currentProvince?'selected-item':''">{{item.name}}</span>
            </div>
          </div><!--
        --><div class="city-box">
            <div class="item-box" @click="selectCity(item)" v-for="(item, index) in currentCities" :key="index">
              <span :title="item.name" :class="item==currentCity?'selected-item':''">{{item.name}}</span>
            </div>
          </div><!--
        --><div class="area-box">
            <div class="item-box" @click="selectArea(item)" v-for="(item, index) in currentAreas" :key="index">
              <span :title="item.name" :class="item==currentArea?'selected-item':''">{{item.name}}</span>
            </div>
          </div>
        </div>
        <div class="tool-bar" v-if="!autoClose">
          <span class="link-button" @click="onConfirm">{{confirmButtonText || controls.confirm}}</span>
          <span class="link-button" @click="onCancel">{{cancelButtonText || controls.cancel}}</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" src="./city-picker.ts"></script>
<style lang="scss" scoped src="./city-picker.scss"></style>
