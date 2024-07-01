<script setup>
import route from './route.json'

</script>

<template>
  <nav class="sidebar">
    <ul>
      <li v-for="item in route">
        <router-link :to="item.path">{{ item.name }}
      </router-link></li>
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
}
.sidebar a {
  text-decoration: none;
  color: #333;
}
.sidebar a:hover {
  color: #007bff;
}
</style>
