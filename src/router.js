import Vue from "vue";
import Router from "vue-router";
import Dashboard from "./views/Dashboard";
import HostManagement from "./views/HostManagement";
import RenterManagement from "./views/RenterManagement";
import Login from "./views/Login";
import store from "./store/store";

Vue.use(Router);

const router = new Router({
  mode: "history",
  base: process.env.BASE_URL,
  routes: [
    {
      path: "/",
      name: "dashboard",
      component: Dashboard,
      meta: {
        requireAuth: true
      }
    },
    {
      path: "/hostManagement",
      name: "hostManagement",
      component: HostManagement,
      meta: {
        requireAuth: true
      }
    },
    {
      path: "/renterManagement",
      name: "renterManagement",
      component: RenterManagement,
      meta: {
        requireAuth: true
      }
    },
    {
      path: "/login",
      name: "Login",
      component: Login
    }
  ]
});

router.beforeEach((to, from, next) => {
  if (to.matched.some(r => r.meta.requireAuth)) {
    if (store.state.token) {
      next();
    } else {
      next({
        path: "/login",
        query: { redirect: to.fullPath }
      });
    }
  } else {
    next();
  }
});

export default router;
