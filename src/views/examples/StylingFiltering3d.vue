<script setup>
import * as Cesium from 'cesium'
import { onMounted } from 'vue'

onMounted(async () => {
    const viewer = Cesium.Viewer('cesiumContainer', {
        terrain: Cesium.Terrain.fromWorldTerrain()
    })
})
</script>

<template>
    <div id="cesiumContainer" class="map">
        
    </div>
</template>

<style>

</style>