<template>
  <div class="login-view">
    <div class="form-container">
      <div class="form-container-content">
        <div class="slogan">{{messages.siteName}}</div>
        <div class="form-cols-2 login-form">
          <span class="form-label">{{controls.userName}}：</span>
          <span class="form-value">
            <ctr-input
              v-model="userName"
              :focus="true"
              :placeholder="controls.userName"
              :errorMessage="messages.required(controls.userName)"
              :error="submitted && !userName"></ctr-input>
          </span>
          <span class="form-label">{{controls.password}}：</span>
          <span class="form-value">
            <ctr-input
              type="password"
              v-model="password"
              :placeholder="controls.password"
              :errorMessage="messages.required(controls.password)"
              :error="submitted && !password"
              @enterEvent="login"></ctr-input>
          </span>
        </div>
        <div class="button-row">
          <ctr-button
            :state="loading?3:1"
            :text="controls.login"
            @clickEvent="login"></ctr-button>
          <ctr-button
            :state="loading?2:1"
            :text="controls.reset"
            @clickEvent="reset"></ctr-button>
        </div>
      </div>
      <div class="form-container-bg"></div>
    </div>
    <div class="copyright">{{messages.copyright}}</div>
  </div>
</template>

<script lang="ts" src="./login.ts"></script>
<style lang="scss" scoped="" type="text/css" src="./login.scss"></style>
