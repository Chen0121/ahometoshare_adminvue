import Vue from "vue";
import Router from "vue-router";
import Dashboard from "./views/Dashboard";
import HostManagement from "./views/HostManagement";
import RenterManagement from "./views/RenterManagement";
import Login from "./views/Login";

Vue.use(Router);

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: "/",
      name: "dashboard",
      component: Dashboard
    },
    {
      path: "/hostManagement",
      name: "hostManagement",
      component: HostManagement
    },
    {
      path: "/renterManagement",
      name: "renterManagement",
      component: RenterManagement
    },
    {
      path: "/login",
      name: "Login",
      component: Login
    }
  ]
});
