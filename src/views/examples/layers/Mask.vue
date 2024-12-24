<script setup>
import * as Cesium from "cesium";
import { onMounted } from "vue";
// import hunanJSON from "@/../public/湖南省_省.geojson"
let viewer = null

onMounted(async () => {
    viewer = new Cesium.Viewer("cesiumContainer")
    viewer.scene.globe.depthTestAgainstTerrain = true
    // const response  = await fetch('/湖南省_省.geojson')
    // const hunanJSON = await response.json()
    // maskPolygon()
    // let array = Cesium.Cartesian3.fromDegreesArray([1, -89, 1, 89, 180, 89, 180, -89])
    // console.log('array', array)


})

const maskPolygon = () => {
     const mask = new Cesium.Entity({
        id: 1,
        polygon: {
            hierarchy: {
                positions: Cesium.Cartesian3.fromDegreesArray([1, -89, 1, 89, 180, 89, 180, -89]), // [100, 0, 100, 89, 150, 89, 150, 0]
                holes:[{
                    positions: Cesium.Cartesian3.fromDegreesArray([110, 30, 110, 50, 130, 50, 130, 30]),
                    holes:[{
                        positions: Cesium.Cartesian3.fromDegreesArray([120, 35, 120, 40, 125, 40, 125, 35]),
                        holes: [{
                            positions: Cesium.Cartesian3.fromDegreesArray([121, 36, 121, 38, 124, 38, 124, 36])
                        }]
                    }]
                }]
            },
            material: Cesium.Color.BLUE.withAlpha(0.6)
        }
    })
    viewer.entities.add(mask)
    viewer.flyTo(mask)
}
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