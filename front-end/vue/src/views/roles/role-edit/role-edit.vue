<template>
  <div class="com-role-edit">
    <div class="form-cols-2">
      <span class="form-label">{{controls.name}}：</span>
      <span class="form-value">
        <ctr-input
          v-model="editingItem.name"
          :focus="true"
          :placeholder="controls.name"
          :errorMessage="messages.required(controls.name)"
          :error="submitted && !editingItem.name"></ctr-input>
      </span>
      <span class="form-label">{{controls.description}}：</span>
      <span class="form-value">
        <ctr-input
          v-model="editingItem.description"
          :placeholder="controls.description"
          @enterEvent="onSave"></ctr-input>
      </span>
      <span class="form-label">{{controls.order}}：</span>
      <span class="form-value">
        <ctr-input
          v-model="editingItem.order"
          type="number"
          :placeholder="controls.order"
          :errorMessage="messages.required(controls.order)"
          :error="submitted && !editingItem.order"></ctr-input>
      </span>
    </div>
    <div class="button-row">
      <ctr-button
        :state="loading?3:1"
        :text="controls.save"
        @clickEvent="onSave"></ctr-button>
      <ctr-button
        type="secondary"
        :text="controls.cancel"
        @clickEvent="onCancel"></ctr-button>
    </div>
  </div>
</template>

<script lang="ts" src="./role-edit.ts"></script>
<style lang="scss" scoped type="text/css" src="./role-edit.scss"></style>