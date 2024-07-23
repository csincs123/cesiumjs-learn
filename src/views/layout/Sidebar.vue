<script setup>
import { reactive, watch, computed } from 'vue';
import { useRoute } from 'vue-router';
import router from '@/router/DynamicRoute.js'

const route = useRoute()

const selectedPath = computed(() => {
  return route.path
})

</script>

<template>
  <nav class="sidebar">
    <ul>
      <li v-for="item in router.getRoutes()" 
      :key="item.name" 
      :class="{active: selectedPath === item.path}"
      >
        <router-link :to="item.path">{{ item.name }}</router-link>
      </li>
    </ul>
  </nav>
</template>

<style scoped>
.sidebar {
  width: 200px;
  height: 100vh;
  background-color: #f8f9fa;
  position: fixed;
  top: 0;
  left: 0;
}
.sidebar ul {
  list-style-type: none;
  padding: 0;
}
.sidebar li {
  padding: 15px;
  cursor: pointer; 
}
.sidebar a {
  text-decoration: none;
  color: #333;
}
.sidebar a:hover {
  color: #00ff88;
}
.sidebar .active {
  background-color: #007bff;
  color: white;
}
</style>
