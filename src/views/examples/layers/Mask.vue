<script setup>
import * as Cesium from "cesium";
import { onMounted } from "vue";
let viewer = null

onMounted(async () => {
    viewer = new Cesium.Viewer("cesiumContainer")
})
</script>

<template>
<div id = "cesiumContainer" class="map">
</div>
</template>

<style scoped>
   .map {
       height: 100%;
       width: 100%; 
    }
</style>