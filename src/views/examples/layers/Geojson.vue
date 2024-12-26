<script setup>
import * as Cesium from 'cesium'
import {onMounted, ref} from 'vue'

let viewer = null
onMounted(async() => {
    viewer = new Cesium.Viewer('cesiumContainer')
    viewer.scene.globe.depthTestAgainstTerrain = true
    viewer.dataSources.add(Cesium.GeoJsonDataSource.load(import.meta.env.BASE_URL + '/湖南省_省.geojson', {
        // stroke: Cesium.Color.HOTPINK,
        // fill: Cesium.Color.PINK,
        // strokeWidth: 3,
        clampToGround: true // 贴地
    }));
})
</script>

<template>
  <div id ="cesiumContainer" class = 'map'>

  </div>
</template>

<style scoped>
    .map {
       height: 100%;
       width: 100%; 
    }
</style>