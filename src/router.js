/*

File: router.js
Author: Peng Li
Clients: Michelle Bilek - A Home To Share
Course: CST8334 - Software Development Project - 2019W
Professor: Reg Dyer
Project: A Home to Share
Copyright @ 2019

*/

import Vue from "vue";
import Router from "vue-router";
import Dashboard from "./views/Dashboard";
import HostManagement from "./views/HostManagement";
import RenterManagement from "./views/RenterManagement";
import ArticleManagement from "./views/ArticleManagement";
import EditAccount from "./views/EditAccount";
import HomeRequestManagement from "./views/HomeRequestManagement";
import About from "./views/About";
import Login from "./views/Login";
import Layout from "./views/Layout";
import store from "./store/store";

Vue.use(Router);

const router = new Router({
  mode: "history",
  base: process.env.BASE_URL,
  routes: [
    {
      path: "/",
      name: "layout",
      component: Layout,
      children: [
        {
          path: "/dashboard",
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
          path: "/articleManagement",
          name: "articleManagement",
          component: ArticleManagement
        },
        {
          path: "/homeRequestManagement",
          name: "homeRequestManagement",
          component: HomeRequestManagement
        },
        {
          path: "/editAccount",
          name: "editAccount",
          component: EditAccount
        },
        {
          path: "/about",
          name: "about",
          component: About
        }
      ],
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
      console.log("Login required");
      next({
        path: "/login"
      });
    }
  } else {
    next();
  }
});

export default router;
