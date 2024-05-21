import { createApp } from "vue";
import App from "./components/App.vue";
import "vuetify/styles"; // Импортируем стили Vuetify
import { createVuetify } from "vuetify";
import * as components from "vuetify/components";
import * as directives from "vuetify/directives";
import './styles/main.scss';

const vuetify = createVuetify({
  components,
  directives,
});

createApp(App).use(vuetify).mount("#app");
