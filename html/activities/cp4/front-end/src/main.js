import Vue from "vue";
import App from "./App.vue";
import router from "./router";


let data = {
  numTeams: 0,
  bracket: [],
  bracketInfo: "You have 0 selected teams",
}

new Vue({
  router,
  data,
  render: (h) => h(App),
}).$mount("#app");
