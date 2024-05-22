import { createMemoryHistory, createRouter } from 'vue-router'; // Corrected import statement

import HomeView from './components/workspace/Projects.vue';
import AboutView from './components/workspace/Clients.vue';

const routes = [
  { path: '/', component: AboutView },
  { path: '/about', component: AboutView },
];

const router = createRouter({
  history: createMemoryHistory(),
  routes,
});

export default router;