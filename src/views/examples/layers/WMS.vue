<script setup>
import * as Cesium from "cesium";
import { onMounted } from "vue";
let viewer = null

onMounted(async () => {
    viewer = new Cesium.Viewer("cesiumContainer")
    viewer.scene.debugShowFramesPerSecond = true

    // 加载wms 
    // ImageryProvider -- WebMapServiceImageryProvider
    let wms = new Cesium.WebMapServiceImageryProvider({
        url: "https://mesonet.agron.iastate.edu/cgi-bin/wms/nexrad/n0r.cgi?",
        layers: "nexrad-n0r",
        credit: "demo",
        parameters: {
            transparent: "true",
            format: "image/png"
        }
    })

    viewer.imageryLayers.addImageryProvider(wms)
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