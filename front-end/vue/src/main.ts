import './styles/vendor.scss';
import './styles/app.scss';

import { createApp } from 'vue';
import { createPinia } from 'pinia';

import App from './App.vue';
import router from './router';

const app = createApp(App);

app.use(createPinia());
app.use(router);
app.directive('focus', {
  mounted(el, binding) {
    binding.value !== false && el.focus();
  }
});

app.mount('#app');
