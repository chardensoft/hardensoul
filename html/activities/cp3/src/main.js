import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import mock from "./mock-data.js";


let data = {
  numTeams: 0,
  teams: mock,
  bracket: [],
  bracketInfo: "You have 0 selected teams",
}

new Vue({
  router,
  data,
  render: (h) => h(App),
}).$mount("#app");
