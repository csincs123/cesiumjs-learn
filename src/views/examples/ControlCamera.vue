<script setup >
import * as Cesium from 'cesium'
import {onMounted} from 'vue'



onMounted (async () => {
  viewer = new Cesium.Viewer("cesiumContainer", {
    terrain: Cesium.Terrain.fromWorldTerrain()
  })
})
</script>

<template>
  <div id = "cesiumContainer" class="map">
  </div>
</template>


<style>
  .map {
    height: 100%;
    width: 100%;
  }

</style>