import axios from "axios";
import store from "./store/store";
import * as types from "./store/types";
import router from "./router";

axios.defaults.timeout = 5000;
axios.defaults.baseURL = "http://localhost:8088";
//axios.defaults.headers.common["token"] = store.state.token;

axios.interceptors.request.use(
  config => {
    if (store.state.token) {
      config.headers.common["token"] = store.state.token;
    }
    return config;
  },
  err => {
    return Promise.reject(err);
  }
);

// http response intercepter
axios.interceptors.response.use(
  response => {
    const resbody = response.data;
    console.log(resbody);
    if (resbody.status == 1) {
      //valid result, login successfully
      return resbody;
    } else if (resbody.status == 2) {
      return Promise.reject(resbody);
    }
  },
  error => {
    if (error.response) {
      switch (error.response.status) {
        case 401:
          // response 401 clean token and redirect to login page
          store.commit(types.LOGOUT);
          // redirect to login if current path isn't login
          router.currentRoute.path !== "login" &&
            router.replace({
              path: "/login",
              query: { redirect: router.currentRoute.path }
            });
      }
    }
    // console.log(JSON.stringify(error));//console : Error: Request failed with status code 402
    return Promise.reject(error.response.data);
  }
);

export default axios;
