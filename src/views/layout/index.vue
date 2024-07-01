<script setup>
import Sidebar from '@/views/layout/Sidebar.vue'
import { RouterView } from 'vue-router';
</script>

<template>
  <div class="container">
    <Sidebar></Sidebar>
    <div class="content">
      <RouterView/>
    </div>
  </div>
</template>

<style scoped>
.container {
  /* display: flex; */
  width: 100vw;
  height: 100vh;
}
.content {
  height: 100vh;
  /* width: 100vw; */
  margin-left: 200px;
  /* padding: 0px; */
  /* flex: 1; */
}
</style>