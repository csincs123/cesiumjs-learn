<script setup>
import * as Cesium from 'cesium';
import { onMounted } from "vue";

let viewer = null

onMounted(async () => {
  viewer = new Cesium.Viewer("cesiumContainer", {
    globe: false
    // terrain: Cesium.Terrain.fromWorldTerrain()
  })
  try {
    const tileset = await Cesium.createGooglePhotorealistic3DTileset();
    viewer.scene.primitives.add(tileset);
  } catch (error) {
    console.log(`Failed to load tileset: ${error}`);
  }
})
</script>

<template>
  <div id = "cesiumContainer" class="map"> 
    <div class="buttonDiv" v-if="false">
      <button @click="addBuildingGeoJSON" >显示新建筑范围</button>
      <button @click="hiddenOldBuilding">隐藏旧建筑</button>
      <button @click="showNewBuilding">显示新建筑</button>
    </div>
  </div>
</template>

<style scoped>
  .map {
    height: 100%;
    width: 100%;
  }

  .buttonDiv {
    display: flex;
    justify-content: space-around;
    z-index: 100;
    /* width: 100px; */
    position: absolute;
    top: 10px;
    left: 200px;
    background-color: #f0f0f0;
    padding: 10px;
    border-radius: 5px;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  }
  .buttonDiv button {
    background-color: #3498db;
    color: white;
    border: none;
    padding: 10px 20px;
    margin: 0 5px;
    cursor: pointer;
    border-radius: 3px;
    transition: background-color 0.3s ease;
  }
  .buttonDiv button:hover {
    background-color: #2980b9
  }
  .buttonDiv button:focus {
    outline: none
  }

</style>