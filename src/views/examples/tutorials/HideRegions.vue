<script setup>
import * as Cesium from 'cesium'
import {ref, reactive, onMounted, watch} from 'vue'

let viewer = null

onMounted(async () => {
    viewer = new Cesium.Viewer("cesiumContainer", {
        timeline: false,
        animation: false,
        sceneModePicker: false,
        baseLayerPicker: false,
        globe: false,
    });

    // Set the optimal lighting for the area of interest
    viewer.scene.skyAtmosphere.show = true;
    const currentTime = Cesium.JulianDate.fromIso8601(
        "2020-01-09T23:00:39.018261982600961346Z"
    );
    viewer.clock.currentTime = currentTime;

    // Add Photorealistic 3D Tiles
    let globalTileset;
    try {
        globalTileset = await Cesium.createGooglePhotorealistic3DTileset();
        viewer.scene.primitives.add(globalTileset);
    } catch (error) {
        console.log(`Error loading Photorealistic 3D Tiles tileset.
        ${error}`);
    }
    viewer.zoomTo(globalTileset)
    // Load a GeoJSON file with positions defining the project footprint
    let footprint;
    try {
        const resource = await Cesium.IonResource.fromAssetId(2533131);
        const dataSource = await Cesium.GeoJsonDataSource.load(resource, {
            clampToGround: true,
        });

        viewer.dataSources.add(dataSource);

        footprint = dataSource.entities.values.find((entity) =>
                Cesium.defined(entity.polygon)
        );
        footprint.polygon.outline = false;

        // Zoom to data location, and set the home view
        const cameraOffset = new Cesium.HeadingPitchRange(
                Cesium.Math.toRadians(95.0),
                Cesium.Math.toRadians(-18.0),
            600.0
        );
        viewer.zoomTo(footprint, cameraOffset);          
        viewer.homeButton.viewModel.command.beforeExecute.addEventListener(
                (e) => {
                e.cancel = true;
                viewer.zoomTo(footprint, cameraOffset);
                }
        );
    } catch (error) {
    console.log(`Error loading geojson. ${error}`);
    }
})
</script>

<template>
    <div id = "cesiumContainer" class = "map"></div>
</template>

<style scoped>
    .map {
    height: 100%;
    width: 100%;
    }
</style>