<template>
  <div class="container">

      <Sidebar></Sidebar>
      <router-view></router-view>
  </div>
</template>

<script>
import { defineComponent } from 'vue';
// @ts-ignore
import Sidebar from './Sidebar.vue';
import Workspace from './workspace/Projects.vue';

export default defineComponent({
  name: 'App',
  components: {
    Workspace,
    Sidebar
  }
});
</script>

<style scoped></style>
