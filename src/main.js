/*

File: main.js
Author: Peng Li
Clients: Michelle Bilek - A Home To Share
Course: CST8334 - Software Development Project - 2019W
Professor: Reg Dyer
Project: A Home to Share
Copyright @ 2019

*/
import Vue from "vue";
import "./plugins/vuetify";
import App from "./App.vue";
import router from "./router";
import store from "./store/store";
import VueResouce from "vue-resource";
import api from "./api";
import ECharts from 'vue-echarts'; // refers to components/ECharts.vue in webpack

// import ECharts modules manually to reduce bundle size
import 'echarts/lib/chart/pie';
import 'echarts/lib/component/tooltip';
import 'echarts/lib/component/title';


// If you want to use ECharts extensions, just import the extension package and it will work
// Taking ECharts-GL as an example:
// You only need to install the package with `npm install --save echarts-gl` and import it as follows
import 'echarts-gl'

// register component to use
Vue.component('v-chart', ECharts)
Vue.use(VueResouce);
Vue.config.productionTip = false;
Vue.prototype.api = api;

export const userDetailBus = new Vue();
export const articleDetailBus = new Vue();

new Vue({
  api,
  router,
  store,
  render: h => h(App)
}).$mount("#app");
