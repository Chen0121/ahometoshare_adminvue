/*

File: store.js
Author: Peng Li
Clients: Michelle Bilek - A Home To Share
Course: CST8334 - Software Development Project - 2019W
Professor: Reg Dyer
Project: A Home to Share
Copyright @ 2019

*/
import Vuex from "vuex";
import Vue from "vue";
import * as types from "./types";

Vue.use(Vuex);
export default new Vuex.Store({
  state: {
    user: {},
    token: null,
    title: ""
  },
  mutations: {
    [types.LOGIN]: (state, data) => {
      localStorage.token = data;
      state.token = data.token;
      state.user = data.user;
    },
    [types.LOGOUT]: state => {
      localStorage.removeItem("token");
      state.token = null;
    },
    [types.TITLE]: (state, data) => {
      state.title = data;
    }
  },
  actions: {
    [types.LOGIN]: ({ commit }, data) => {
      commit(types.LOGIN, data);
    },
    [types.LOGOUT]: ({ commit }) => {
      commit(types.LOGOUT);
    }
  }
});
