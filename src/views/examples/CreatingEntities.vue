<script setup>
import * as Cesium from 'cesium'
import {ref, onMounted} from 'vue'
import selectEdit from '@/components/selectEdit/index.vue'

let viewer = null
onMounted(async () => {
  viewer = new Cesium.Viewer('cesiumContainer')
})
const options = [
    {label: "第一个实体", value: firstEntity}
]
function firstEntity () {
  const wyoming = viewer.entities.add({
    polygon: {
      hierarchy: Cesium.Cartesian3.fromDegreesArray([
        -109.080842, 45.002073, -105.91517, 45.002073, -104.058488, 44.996596,
        -104.053011, 43.002989, -104.053011, 41.003906, -105.728954, 40.998429,
        -107.919731, 41.003906, -109.04798, 40.998429, -111.047063, 40.998429,
        -111.047063, 42.000709, -111.047063, 44.476286, -111.05254, 45.002073,
      ]),
      height: 0,
      material: Cesium.Color.RED.withAlpha(0.5),
      outline: true,
      outlineColor: Cesium.Color.BLACK,
    },
  });
  wyoming.polygon.height = 200000;
  wyoming.polygon.extrudedHeight = 250000;

  viewer.zoomTo(wyoming);
}

function shapesVolumes () {

}
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