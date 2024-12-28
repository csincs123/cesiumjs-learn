<script setup>
import * as Cesium from 'cesium'
import {ref, onMounted} from 'vue'

let showFootprint = ref(true)
let clipTargetLocation = ref(false)
let inverseClip = ref(false)
let viewer = null
let footprint = null;
let clippingPolygons = null

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
    // Load a GeoJSON file with positions defining the project footprint
    
    try {
        // const resource = await Cesium.IonResource.fromAssetId(2533131);
        const dataSource = await Cesium.GeoJsonDataSource.load(import.meta.env.BASE_URL + '/AECCliping.json', {
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
                Cesium.Math.toRadians(-75.0),
            800.0
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

    // Add a clipping region based on the loaded project footprint
    const positions = footprint.polygon.hierarchy.getValue().positions;
    clippingPolygons = new Cesium.ClippingPolygonCollection({
    polygons: [
        new Cesium.ClippingPolygon({
        positions: positions,
        }),
    ],
    });
    globalTileset.clippingPolygons = clippingPolygons;
    clippingPolygons.enabled = false
    // clippingPolygons.inverse = true

})

const changeShowFootprint = () => {
    footprint.show = showFootprint.value
}
const changeClipTargetLocation = () => {
    clippingPolygons.enabled = clipTargetLocation.value
}

const changeInverseClip = () => {
    clippingPolygons.enabled = true
    clippingPolygons.inverse = inverseClip.value
}
</script>

<template>
    <div id = "cesiumContainer" class = "map">
        <div class="toolbar">
                <!-- <el-checkbox label="展示设计" v-model="showDesign" @change="changeShowDesign"></el-checkbox> -->
                <el-checkbox label="展示覆盖区" v-model="showFootprint" @change="changeShowFootprint" ></el-checkbox>
                <el-checkbox label="裁切目标区域" v-model="clipTargetLocation" @change="changeClipTargetLocation"></el-checkbox>
                <el-checkbox label="反裁切" v-model="inverseClip" @change="changeInverseClip"></el-checkbox>
        </div>
    </div>
</template>

<style scoped>
    .map {
        height: 100%;
        width: 100%;
        position: relative;
    }
    .toolbar {
        position: absolute;
        left: 20px;
        z-index: 100;
        background-color: aquamarine;
    }
</style>