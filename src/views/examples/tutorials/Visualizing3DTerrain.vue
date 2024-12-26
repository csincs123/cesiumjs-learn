<script setup>
import * as Cesium from 'cesium'
import {ref, onMounted} from 'vue'
import selectEdit from '@/components/selectEdit/index.vue'

let viewer = null
onMounted(async () => {
  viewer = new Cesium.Viewer('cesiumContainer', {
    terrain: Cesium.Terrain.fromWorldTerrain({
        requestVertexNormals: true,
        requestWaterMask: true,
    })
  })
  viewer.scene.globe.enableLighting = true;
})
</script>

<template>
    <div id = "cesiumContainer" class = "map">
      <selectEdit :options = "options" ></selectEdit>
    </div>
</template>
  
<style>
.map{
    height: 100%;
    width:100%
}
</style>
