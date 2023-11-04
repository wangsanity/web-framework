<template>
  <div class="com-user-profile">
    <div class="user-profile" v-if="item">
      <span class="form-label">{{controls.loginName}}：</span>
      <span class="form-value">
        {{item.loginName}}
      </span>

      <span class="form-label">{{controls.fullName}}：</span>
      <span class="form-value">
        {{item.fullName}}
      </span>

      <span class="form-label">{{controls.birthday}}：</span>
      <span class="form-value">
        {{item.birthday}}
      </span>

      <span class="form-label">{{controls.cellphone}}：</span>
      <span class="form-value">
        {{item.cellphone}}
      </span>

      <span class="form-label">{{controls.email}}：</span>
      <span class="form-value">
        {{item.email}}
      </span>

      <span class="form-label">{{controls.roles}}：</span>
      <span class="form-value">
        {{item.roles}}
      </span>

      <span class="form-label">{{controls.remark}}：</span>
      <span class="form-value">
        {{item.remark}}
      </span>
    </div>
  </div>
</template>

<script lang="ts" src="./user-profile.ts"></script>
<style lang="scss" scoped src="./user-profile.scss"></style>
