import { createApp } from "vue";
import App from "./components/App.vue";
import "vuetify/styles"; // Import Vuetify styles

import { createRouter, createWebHistory } from "vue-router"; // Import Vue Router

import { createVuetify } from "vuetify";
import * as components from "vuetify/components";
import * as directives from "vuetify/directives";
import "./styles/main.scss";
import "@mdi/font/css/materialdesignicons.css";

import Home from "./components/Home.vue";
import Projects from "./components/workspace/Projects.vue";
import Clients from "./components/workspace/Clients.vue";
import Estimation from "./components/workspace/Estimation.vue";
import Account from "./components/auth/Account.vue";
import Login from "./components/auth/Login.vue"; 
import Registration from "./components/auth/Registration.vue"; 
import CheckToken from "./components/CheckToken.vue"

const routes = [
  { path: "/", component: Home },
  { path: "/home", name: "Home", component: Home },
  { path: "/projects", name: "Projects", component: Projects },
  { path: "/clients", name: "Clients", component: Clients },
  { path: "/estimation", name: "Estimation", component: Estimation },
  { path: "/account", name: "Account", component: Account },
  { path: "/login", name: "Login", component: Login },
  { path: "/registration", name: "Registration", component: Registration },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

function isAuthenticated() {
  const token = localStorage.getItem("token");
  return !!token;
}

router.beforeEach((to, from, next) => {
  const publicPages = ["/login", "/registration", "/", "/home"];
  const authRequired = !publicPages.includes(to.path);
  const loggedIn = isAuthenticated();

  if (authRequired && !loggedIn) {
    return next("/login");
  }

  next();
});

const vuetify = createVuetify({
  components,
  directives,
});

createApp(App).use(router).use(vuetify).mount("#app");
