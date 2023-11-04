<template>
  <div class="com-user-edit">
    <div class="form-cols-2">
      <span class="form-label">{{controls.loginName}}：</span>
      <span class="form-value">
        <ctr-input
          v-model="editingItem.loginName"
          :focus="true"
          :placeholder="controls.loginName"
          :errorMessage="messages.required(controls.loginName)"
          :error="submitted && !editingItem.loginName"></ctr-input>
      </span>
      <span class="form-label">{{controls.fullName}}：</span>
      <span class="form-value">
        <ctr-input
          v-model="editingItem.fullName"
          :placeholder="controls.fullName"
          :errorMessage="messages.required(controls.fullName)"
          :error="submitted && !editingItem.fullName"></ctr-input>
      </span>
      <span class="form-label">{{controls.birthday}}：</span>
      <span class="form-value">
        <ctr-input
          type="date"
          v-model="editingItem.birthday"
          :placeholder="controls.birthday"
          @enterEvent="onSave"></ctr-input>
      </span>
      <span class="form-label">{{controls.address}}：</span>
      <span class="form-value">
        <ctr-city-picker @confirmEvent="onSelectCity" width="294px" :fullCode="editingItem.addressCode">
          <ctr-input
          v-model="editingItem.address"
          :showClearButton="true"
          :placeholder="controls.address"
          :readonly="true"></ctr-input>
        </ctr-city-picker>
      </span>
      <span class="form-label">{{controls.cellphone}}：</span>
      <span class="form-value">
        <ctr-input
          v-model="editingItem.cellphone"
          :placeholder="controls.cellphone"
          @enterEvent="onSave"></ctr-input>
      </span>
      <span class="form-label">{{controls.email}}：</span>
      <span class="form-value">
        <ctr-input
          type="email"
          v-model="editingItem.email"
          :placeholder="controls.email"
          @enterEvent="onSave"></ctr-input>
      </span>
      <span class="form-label">{{controls.remark}}：</span>
      <span class="form-value">
        <ctr-input
          v-model="editingItem.remark"
          :placeholder="controls.remark"
          @enterEvent="onSave"></ctr-input>
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

<script lang="ts" src="./user-edit.ts"></script>
<style lang="scss" scoped type="text/css" src="./user-edit.scss"></style>