<template>
  <div class="container">
      <Sidebar v-if="showSidebar"></Sidebar>
      <router-view></router-view>
  </div>
</template>

<script>
import { defineComponent, computed } from 'vue';
import { useRoute } from 'vue-router';
import Sidebar from './Sidebar.vue';
import Workspace from './workspace/Projects.vue';
import { toast } from 'vue3-toastify';
import 'vue3-toastify/dist/index.css';

export default defineComponent({
  name: 'App',
  components: {
    Workspace,
    Sidebar
  },
  setup() {
    const route = useRoute();

    const showSidebar = computed(() => {
      return route.name !== 'Login' && route.name !== 'Registration';
    });

    return {
      showSidebar
    };
  },
  methods: {
    showToast() {
      toast({
        message: 'Это уведомление!',
        position: 'top-right',
        autoClose: 5000
      });
    }
  },
});
</script>

<style scoped></style>
