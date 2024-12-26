<script setup>
import * as Cesium from 'cesium'
import {onMounted, ref} from 'vue'
import {drawTIN} from './drawTIN.js'
const baseUrl = import.meta.env.BASE_URL
let viewer = null
onMounted(async() => {
    viewer = new Cesium.Viewer('cesiumContainer', {
        terrain: Cesium.Terrain.fromWorldTerrain()
    })
    await drawTri()
    cameraSetView(123.06125894180711, 41.03382854489735, 2164.4393773033075)
})

const primitives1 = ref(null)
const drawTri = () => {
    const geometryColor = new Cesium.Color(
      0, // 红色分量 [0, 1]
      0, // 绿色分量 [0, 1]
      1, // 蓝色分量 [0, 1]
      0.5 // 不透明 (alpha = 1.0)
    )
    primitives1.value = drawTIN(
      viewer,
      baseUrl + "/triangle/point_大孤山铁矿_3_+5m.txt", // public/triangle/point_大孤山铁矿_3_+5m.txt
      baseUrl + "/triangle/index_大孤山铁矿_3_+5m.txt",   // public/triangle/index_大孤山铁矿_3_+5m.txt
      geometryColor
    )
} 

const cameraSetView = (longitude, latitude, height) => {
  viewer.camera.setView({
    destination: Cesium.Cartesian3.fromDegrees(longitude, latitude, height),
    orientation: {
      heading: Cesium.Math.toRadians(0),
      pitch: Cesium.Math.toRadians(-45.0),
      roll: 0.0
    }
  })
}
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