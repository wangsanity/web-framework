<template>
  <div class="password-view">
    <div class="form-wrapper">
      <div class="form-password">
        <span class="form-label">{{controls.originalPassword}}：</span>
        <span class="form-value">
          <ctr-input
            type="password"
            v-model="originalPassword"
            :focus="true"
            :placeholder="controls.originalPassword"
            :errorMessage="messages.required(controls.originalPassword)"
            :error="submitted && !originalPassword"></ctr-input>
        </span>
        <span class="form-label">{{controls.newPassword}}：</span>
        <span class="form-value">
          <ctr-input
            type="password"
            v-model="newPassword"
            :placeholder="controls.newPassword"
            :errorMessage="messages.required(controls.newPassword)"
            :error="submitted && !newPassword"></ctr-input>
        </span>
        <span class="form-label">{{controls.passwordConfirm}}：</span>
        <span class="form-value">
          <ctr-input
            v-model="passwordConfirm"
            type="password"
            :placeholder="controls.passwordConfirm"
            :errorMessage="messages.required(controls.passwordConfirm)"
            :error="submitted && !passwordConfirm"
            @enterEvent="onSave"></ctr-input>
        </span>
      </div>
      <div class="button-row">
        <ctr-button
          :isLoading="loading"
          :text="controls.save"
          @clickEvent="onSave"></ctr-button>
        <ctr-button
          type="secondary"
          :text="controls.reset"
          @clickEvent="onReset"></ctr-button>
      </div>
    </div>
  </div>
</template>

<script lang="ts" src="./password.ts"></script>
<style lang="scss" scoped="" type="text/css" src="./password.scss"></style>