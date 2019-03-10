import Vue from "vue";
import "./plugins/vuetify";
import App from "./App.vue";
import router from "./router";
import store from "./store/store";
import VueResouce from "vue-resource";
import api from "./api";

Vue.use(VueResouce);
Vue.config.productionTip = false;
Vue.prototype.api = api;

export const userDetailBus = new Vue();

new Vue({
  api,
  router,
  store,
  render: h => h(App)
}).$mount("#app");
