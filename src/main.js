import { createApp } from "vue";
import App from "./components/App.vue";
import "vuetify/styles"; // Импортируем стили Vuetify
import { createVuetify } from "vuetify";
import * as components from "vuetify/components";
import * as directives from "vuetify/directives";
import './styles/main.scss';
import '@mdi/font/css/materialdesignicons.css'

const vuetify = createVuetify({
  components,
  directives,
});

createApp(App).use(vuetify).mount("#app");
