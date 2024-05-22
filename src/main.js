import { createApp } from "vue";
import App from "./components/App.vue";
import "vuetify/styles"; // Import Vuetify styles

import { createRouter, createWebHistory } from 'vue-router'; // Import Vue Router

import { createVuetify } from "vuetify";
import * as components from "vuetify/components";
import * as directives from "vuetify/directives";
import "./styles/main.scss";
import "@mdi/font/css/materialdesignicons.css";

import Home from './components/workspace/Projects.vue';
import Projects from './components/workspace/Projects.vue';
import Clients from './components/workspace/Clients.vue';

const routes = [ 
  { path: '/', component: Home },
  { path: '/projects', component: Projects },
  { path: '/clients', component: Clients },
];

const router = createRouter({
  history: createWebHistory(), 
  routes,
});

const vuetify = createVuetify({
  components,
  directives,
});

createApp(App)
  .use(router) 
  .use(vuetify)
  .mount("#app");
