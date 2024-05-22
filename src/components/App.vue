<template>
  <div class="container">
    <Sidebar></Sidebar>
    <Workspace></Workspace>

  </div>
</template>

<script>
import { defineComponent } from 'vue';
// @ts-ignore
import Workspace from './Workspace.vue';
import Sidebar from './Sidebar.vue';

export default defineComponent({
  name: 'App',
  components: {
    Workspace,
    Sidebar
  }
});
</script>

<style scoped></style>
