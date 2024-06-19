<template>
  <div class="container">
      <Sidebar></Sidebar>
      <router-view></router-view>
  </div>
</template>

<script>
import { defineComponent } from 'vue';
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
